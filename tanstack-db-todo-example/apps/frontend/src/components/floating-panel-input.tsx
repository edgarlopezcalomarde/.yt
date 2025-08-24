import {
  FloatingPanelBody,
  FloatingPanelCloseButton,
  FloatingPanelContent,
  FloatingPanelFooter,
  FloatingPanelForm,
  FloatingPanelLabel,
  FloatingPanelRoot,
  FloatingPanelSubmitButton,
  FloatingPanelTextarea,
  FloatingPanelTrigger,
} from "./ui/floating-panel";

interface FloatingPaneInputProps {
  onSubmit: (note: string) => void;
}

export default function FloatingPanelInput({
  onSubmit,
}: FloatingPaneInputProps) {
  return (
    <FloatingPanelRoot>
      <FloatingPanelTrigger
        title="Add Note"
        className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
      >
        <span>Agregar Nota</span>
      </FloatingPanelTrigger>
      <FloatingPanelContent className="w-80">
        <FloatingPanelForm onSubmit={onSubmit}>
          <FloatingPanelBody>
            <FloatingPanelLabel htmlFor="note-input">Nota</FloatingPanelLabel>
            <FloatingPanelTextarea id="note-input" className="min-h-[100px]" />
          </FloatingPanelBody>
          <FloatingPanelFooter>
            <FloatingPanelCloseButton />
            <FloatingPanelSubmitButton />
          </FloatingPanelFooter>
        </FloatingPanelForm>
      </FloatingPanelContent>
    </FloatingPanelRoot>
  );
}
