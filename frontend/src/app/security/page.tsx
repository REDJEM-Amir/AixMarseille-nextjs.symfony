import UploadForm from "@/components/UploadForm";
import css from "@/styles/pageAdmin.module.css"
import { getSession } from '@auth0/nextjs-auth0';

export default async function Page() {
  const session = await getSession();

  if (session) {
    return (
      <div className={css.containerAdmin}>
        <UploadForm />
      </div>
    );
  } else {
    <div className={css.containerAdmin}>
      Vous n'êtes pas autorisé à accéder à cette page.
    </div>
  }
}