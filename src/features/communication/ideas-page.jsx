import { useState } from 'react';
import { Lightbulb, Plus } from 'lucide-react';
import { useAuth } from '../../app/auth';
import { EntityForm } from '../../components/resource-page';
import { Button, EmptyState, PageHeader, QueryState, SearchBox } from '../../components/ui';
import { api, list, useData } from '../../lib/api';

export default function IdeasPage() {
  const { account, role } = useAuth();
  const query = useData('/projectIdea/getall');
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const rows = list(query.data).filter((row) =>
    `${row.title} ${row.description} ${row.teacherName}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  return (
    <>
      <PageHeader
        eyebrow="Explore possibilities"
        title="Project ideas"
        description="A spark of inspiration for what your team could build next."
        action={
          role !== 'student' && (
            <Button onClick={() => setAdding(true)}>
              <Plus size={17} />
              Share an idea
            </Button>
          )
        }
      />
      <div className="section-toolbar">
        <span className="muted">Ideas from your supervisors</span>
        <SearchBox value={search} onChange={setSearch} placeholder="Find your next idea…" />
      </div>
      <QueryState query={query}>
        {rows.length ? (
          <div className="card-grid">
            {rows.map((idea) => (
              <article className="panel idea-card" key={idea._id}>
                <span className="idea-icon">
                  <Lightbulb size={23} />
                </span>
                <h2>{idea.title}</h2>
                <p className="preserve-lines">{idea.description}</p>
                <footer>
                  Shared by <strong>{idea.teacherName}</strong>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <section className="panel">
            <EmptyState
              title={search ? 'No matching ideas' : 'The next great idea could be yours'}
              description="Project suggestions shared by supervisors will appear here."
              icon={Lightbulb}
            />
          </section>
        )}
      </QueryState>
      {adding && (
        <EntityForm
          title="Share a project idea"
          fields={[
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description', type: 'textarea' },
            { key: 'teacherName', label: 'Shared by', default: account.name },
          ]}
          onClose={() => setAdding(false)}
          onSave={(data) => api.post('/projectIdea/add', data)}
          submitLabel="Share idea"
        />
      )}
    </>
  );
}
