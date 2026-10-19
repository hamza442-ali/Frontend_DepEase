import { useState } from 'react';
import { Download, ExternalLink, FileText, Trash2, Upload } from 'lucide-react';
import { useWorkspace } from '../../app/workspace';
import { ProjectGate } from '../../components/project-gate';
import {
  Button,
  ConfirmDialog,
  EmptyState,
  ErrorNotice,
  Field,
  Modal,
  PageHeader,
  QueryState,
} from '../../components/ui';
import { api, encode, list, useAction, useData } from '../../lib/api';
import { safeUrl } from '../../lib/format';

export default function DocumentsPage() {
  return (
    <ProjectGate>
      <Documents />
    </ProjectGate>
  );
}

function Documents() {
  const { project, canManageProject } = useWorkspace();
  const query = useData(`/documents/getmine/${encode(project.ProjectId)}`);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [downloading, setDownloading] = useState(null);
  const [downloadError, setDownloadError] = useState(null);
  async function download(file) {
    setDownloading(file._id);
    setDownloadError(null);
    try {
      const response = await api.get(`/documents/download/${encode(file._id)}`, {
        responseType: 'blob',
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.filename;
      document.body.append(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      setDownloadError(
        new Error(
          error.response?.status === 404
            ? 'This file is no longer available.'
            : 'The file could not be downloaded. Please try again.',
        ),
      );
    } finally {
      setDownloading(null);
    }
  }
  const remove = useAction((record) => api.delete(`/documents/delete/${encode(record._id)}`));
  return (
    <>
      <PageHeader
        eyebrow="Project workspace"
        title="Documents"
        description="A shared home for reports, references, and project files."
        action={
          <Button disabled={!canManageProject} onClick={() => setUploading(true)}>
            <Upload size={17} />
            Upload document
          </Button>
        }
      />
      <ErrorNotice error={downloadError} />
      <QueryState query={query}>
        {list(query.data?.files).length ? (
          <div className="card-grid">
            {list(query.data?.files).map((file) => (
              <article className="panel document-card" key={file._id}>
                <div className="document-icon">
                  <FileText size={27} />
                </div>
                <h3>{file.filename}</h3>
                <p className="muted">Project document</p>
                <footer>
                  {file.provider === 'local' ? (
                    <Button
                      variant="secondary"
                      busy={downloading === file._id}
                      onClick={() => download(file)}
                    >
                      Download <Download size={15} />
                    </Button>
                  ) : safeUrl(file.secure_url) ? (
                    <a
                      className="button button-secondary"
                      href={safeUrl(file.secure_url)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open file
                      <ExternalLink size={15} />
                    </a>
                  ) : (
                    <span className="muted">Link unavailable</span>
                  )}
                  <button
                    disabled={!canManageProject}
                    className="icon-button text-danger"
                    aria-label={`Delete ${file.filename}`}
                    onClick={() => {
                      remove.reset();
                      setDeleting(file);
                    }}
                  >
                    <Trash2 size={17} />
                  </button>
                </footer>
              </article>
            ))}
          </div>
        ) : (
          <section className="panel">
            <EmptyState
              title="Your documents belong here"
              description="Upload the first report or reference for your team."
            />
          </section>
        )}
      </QueryState>
      {uploading && <UploadForm project={project} onClose={() => setUploading(false)} />}
      {deleting && (
        <ConfirmDialog
          title="Delete this document?"
          description={deleting.filename}
          busy={remove.isPending}
          error={remove.error}
          onClose={() => {
            if (!remove.isPending) setDeleting(null);
          }}
          onConfirm={async () => {
            try {
              await remove.mutateAsync(deleting);
              setDeleting(null);
            } catch {
              /* Keep the dialog open. */
            }
          }}
        />
      )}
    </>
  );
}

function UploadForm({ project, onClose }) {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState('');
  const upload = useAction(async () => {
    if (!file) throw new Error('Choose a file first.');
    if (file.size > 10 * 1024 * 1024) throw new Error('Choose a file smaller than 10 MB.');
    const data = new FormData();
    data.append('file', file);
    data.append('filename', filename.trim());
    data.append('ProjectId', project.ProjectId);
    return api.post('/documents/add', data, { timeout: 90000 });
  });
  const close = () => {
    if (!upload.isPending) onClose();
  };
  return (
    <Modal title="Upload document" description="Files can be up to 10 MB." onClose={close}>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          try {
            await upload.mutateAsync();
            onClose();
          } catch {
            /* Keep the selected file on failure. */
          }
        }}
      >
        <Field
          label="File"
          type="file"
          required
          onChange={(event) => {
            const next = event.target.files?.[0];
            setFile(next);
            if (next) setFilename(next.name);
          }}
        />
        <Field
          label="Document name"
          value={filename}
          required
          maxLength={200}
          onChange={(event) => setFilename(event.target.value)}
        />
        <ErrorNotice error={upload.error} />
        <div className="form-actions">
          <Button variant="secondary" disabled={upload.isPending} onClick={close}>
            Cancel
          </Button>
          <Button type="submit" busy={upload.isPending}>
            Upload document
          </Button>
        </div>
      </form>
    </Modal>
  );
}
