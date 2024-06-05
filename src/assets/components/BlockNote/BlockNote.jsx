import PropTypes from 'prop-types';
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  defaultStyleSpecs,
} from '@blocknote/core';
import { useCreateBlockNote} from '@blocknote/react';
import { BlockNoteView } from '@blocknote/mantine';
import { CodeBlock } from '@defensestation/blocknote-code';
import {
  CommentToolbarController,
  commentStyleSpec,
} from '@defensestation/blocknote-comments';
import '@blocknote/core/fonts/inter.css';
import '@blocknote/react/style.css';
import { AlertBlock } from './features/alertBlock';
import { codeStyleSpec } from './features/code-toolbar/code-toolbar.stylespec';

const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: AlertBlock,
    procode: CodeBlock,
  },
  styleSpecs: {
    ...defaultStyleSpecs,
    comment: commentStyleSpec,
    code: codeStyleSpec,
  },
});

function ArticleViewer({ body }) {
  const editor = useCreateBlockNote({
    schema,
    initialContent: body,
  });

  return (
    <BlockNoteView
      data-changing-font-demo
      slashMenu={false}
      editor={editor}
      theme="light"
      formattingToolbar={false}
      editable={false}
    > 
    </BlockNoteView>
  );
}

ArticleViewer.propTypes = {
  body: PropTypes.node.isRequired,
};

export default ArticleViewer;
