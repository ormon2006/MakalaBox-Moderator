import { ToolbarButton, useBlockNoteEditor, useEditorContentOrSelectionChange } from '@blocknote/react';
import { useState, useEffect } from 'react';
import { RiCodeFill } from 'react-icons/ri';

export function CodeButton() {
  const editor = useBlockNoteEditor();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (editor) {
      setIsSelected(editor.getActiveStyles().code === 'rgba(135,131,120,.15)');
    }
  }, [editor]);

  useEditorContentOrSelectionChange(() => {
    if (editor) {
      setIsSelected(editor.getActiveStyles().code === 'rgba(135,131,120,.15)');
    }
  }, editor);

  const toggleCodeStyle = () => {
    if (!editor) return;

    const currentStyles = editor.getActiveStyles();
    if (currentStyles.code === 'rgba(135,131,120,.15)') {
      editor.removeStyles({ code: '' });
      setIsSelected(false);
    } else {
      editor.addStyles({
        code: 'rgba(135,131,120,.15)',
      });
      setIsSelected(true);
    }
  };

  return (
    <ToolbarButton
      mainTooltip={'Code'}
      icon={RiCodeFill}
      onClick={toggleCodeStyle}
      isSelected={isSelected}
    />
  );
}
