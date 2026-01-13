import {
  createIdentifier,
  type ServiceIdentifier,
} from '@blocksuite/global/di';
import type { ExtensionType } from '@blocksuite/store';

import type { BlockAdapterMatcher } from '../types/adapter.js';
import type { HtmlAST } from '../types/hast.js';
import type { NotionHtmlDeltaConverter } from './delta-converter.js';

export type BlockNotionHtmlAdapterMatcher = BlockAdapterMatcher<
  HtmlAST,
  NotionHtmlDeltaConverter
>;

export const BlockNotionHtmlAdapterMatcherIdentifier =
  createIdentifier<BlockNotionHtmlAdapterMatcher>(
    'BlockNotionHtmlAdapterMatcher'
  );

export function BlockNotionHtmlAdapterExtension(
  matcher: BlockNotionHtmlAdapterMatcher
): ExtensionType & {
  identifier: ServiceIdentifier<BlockNotionHtmlAdapterMatcher>;
} {
  // Ensure matcher.flavour is a string. If it's undefined, null, or not a non-empty string,
  // fall back to a default value to prevent runtime errors when creating the identifier.
  const flavour = typeof matcher.flavour === 'string' && matcher.flavour.length > 0
    ? matcher.flavour
    : 'notion-html-default-flavour'; // A descriptive default flavour

  const identifier = BlockNotionHtmlAdapterMatcherIdentifier(flavour);
  return {
    setup: di => {
      di.addImpl(identifier, () => matcher);
    },
    identifier,
  };
}
