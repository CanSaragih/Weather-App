import { SignInForm } from "./layout/login/SignInForm";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface ModalLoginProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

export default function ModalLogin({
  modalOpen,
  setModalOpen,
}: ModalLoginProps) {
  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent
        className="sm:max-w-md p-0 border-none bg-transparent shadow-none"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Supaya SignInForm yang memiliki desain sendiri menyatu sempurna */}
        <div className="bg-white dark:bg-black rounded-2xl w-full p-4 overflow-hidden relative">
          {/* Judul disembunyikan scr visual jika SignInForm sdh punya judul, tapi penting utk aksesibilitas Radix UI */}
          <DialogTitle className="sr-only">Login Form</DialogTitle>
          <SignInForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
