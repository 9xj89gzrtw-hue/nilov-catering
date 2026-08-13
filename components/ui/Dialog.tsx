"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

/**
 * Modal/Dialog - модальное окно на базе Radix UI
 * 
 * Простое использование:
 * ```tsx
 * <Dialog>
 *   <DialogTrigger asChild>
 *     <button>Открыть</button>
 *   </DialogTrigger>
 *   <DialogContent>
 *     <DialogTitle>Заголовок</DialogTitle>
 *     <DialogDescription>Описание</DialogDescription>
 *     <p>Контент</p>
 *   </DialogContent>
 * </Dialog>
 * ```

 * Управляемое состояние:
 * ```tsx
 * function MyComponent() {
 *   const [open, setOpen] = useState(false);
 *   return (
 *     <Dialog open={open} onOpenChange={setOpen}>
 *       <DialogContent>...</DialogContent>
 *     </Dialog>
 *   );
 * }
 * ```
 */

function DialogRoot({
  children,
  open,
  onOpenChange,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Root>) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} {...props}>
      {children}
    </Dialog.Root>
  );
}

const DialogTrigger = Dialog.Trigger;
const DialogPortal = Dialog.Portal;
const DialogClose = Dialog.Close;

function DialogOverlay({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      className={cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/80",
        className
      )}
      {...props}
    />
  );
}

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof Dialog.Content> {
  /** Показывать кнопку закрытия */
  showCloseButton?: boolean;
  /** Дополнительный контент для хедера */
  header?: ReactNode;
  /** Дополнительный контент для футера */
  footer?: ReactNode;
}

function DialogContent({
  children,
  className,
  showCloseButton = true,
  header,
  footer,
  ...props
}: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
        className={cn(
          "bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 shadow-lg duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
          "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          "sm:rounded-lg",
          className
        )}
        {...props}
      >
        {header && (
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">{header}</div>
        )}

        {children}

        {footer && (
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            {footer}
          </div>
        )}

        {showCloseButton && (
          <Dialog.Close className="ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Закрыть</span>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </DialogPortal>
  );
}

function DialogTitle({ className, ...props }: React.ComponentPropsWithoutRef<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      className={cn("text-lg leading-none font-semibold tracking-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Dialog.Description>) {
  return (
    <Dialog.Description className={cn("text-muted-foreground text-sm", className)} {...props} />
  );
}

function DialogHeader({ children, ...props }: { children: ReactNode } & Record<string, unknown>) {
  return <div {...props}>{children}</div>;
}

function DialogFooter({ children, ...props }: { children: ReactNode } & Record<string, unknown>) {
  return <div {...props}>{children}</div>;
}

export {
  DialogRoot as Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
