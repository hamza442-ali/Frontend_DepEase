import { useState } from 'react';
import { Inbox, Mail, Plus, Send } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { EntityForm } from '../../components/resource-page';
import {
  Button,
  EmptyState,
  Modal,
  PageHeader,
  QueryState,
  SuccessNotice,
} from '../../components/ui';
import { api, encode, list, useData } from '../../lib/api';
import { dateLabel } from '../../lib/format';

export default function MessagesPage() {
  const { account } = useAuth();
  const email = account.email_address || account.email;
  const [tab, setTab] = useState('received');
  const [composing, setComposing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [sent, setSent] = useState(false);
  const query = useData(
    `/email/${tab === 'received' ? 'getreceived' : 'getsent'}/${encode(email)}`,
  );
  return (
    <>
      <PageHeader
        eyebrow="Stay connected"
        title="Messages"
        description="Keep project conversations together, from the first question to the final review."
        action={
          <Button
            onClick={() => {
              setSent(false);
              setComposing(true);
            }}
          >
            <Plus size={17} />
            Compose message
          </Button>
        }
      />
      {sent && <SuccessNotice>{sent}</SuccessNotice>}
      <section className="panel mail-layout">
        <aside className="mail-sidebar">
          <button className={tab === 'received' ? 'active' : ''} onClick={() => setTab('received')}>
            <Inbox size={18} />
            Inbox
          </button>
          <button className={tab === 'sent' ? 'active' : ''} onClick={() => setTab('sent')}>
            <Send size={18} />
            Sent
          </button>
          <small>{email}</small>
        </aside>
        <div className="mail-content">
          <div className="panel-heading">
            <h2>{tab === 'received' ? 'Inbox' : 'Sent messages'}</h2>
            <span className="muted">{list(query.data).length} messages</span>
          </div>
          <QueryState query={query}>
            {[...list(query.data)]
              .sort((a, b) => new Date(b.sentAt) - new Date(a.sentAt))
              .map((message) => (
                <button className="mail-row" key={message._id} onClick={() => setSelected(message)}>
                  <Mail size={18} />
                  <div>
                    <strong>{message.subject}</strong>
                    <span>{tab === 'received' ? message.sender : message.recipient}</span>
                    <p>{message.text}</p>
                  </div>
                  <time>{dateLabel(message.sentAt)}</time>
                </button>
              ))}
            {!list(query.data).length && (
              <EmptyState
                title={tab === 'received' ? 'Your inbox is clear' : 'No sent messages yet'}
                description="Your project conversations will appear here."
                icon={Mail}
              />
            )}
          </QueryState>
        </div>
      </section>
      {composing && (
        <EntityForm
          title="Compose message"
          fields={[
            { key: 'recipientEmail', label: 'To', type: 'email' },
            { key: 'subject', label: 'Subject' },
            { key: 'message', label: 'Message', type: 'textarea' },
          ]}
          onClose={() => setComposing(false)}
          onSave={async (data) => {
            const response = await api.post('/email/send', data, { timeout: 60000 });
            setSent(response.data.message);
          }}
          submitLabel="Send message"
        />
      )}
      {selected && (
        <Modal
          title={selected.subject}
          description={`${selected.sender} → ${selected.recipient} · ${dateLabel(selected.sentAt)}`}
          onClose={() => setSelected(null)}
        >
          <p className="preserve-lines message-body">{selected.text}</p>
        </Modal>
      )}
    </>
  );
}
