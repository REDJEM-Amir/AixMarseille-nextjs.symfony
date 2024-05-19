import UploadForm from "@/components/UploadForm";
import css from "@/styles/pageAdmin.module.css"

export default function Page() {
  return (
    <div className={css.container}>
        <UploadForm />
    </div>
  );
}
