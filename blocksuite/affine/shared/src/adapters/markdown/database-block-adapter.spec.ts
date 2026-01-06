import { BlockSuiteEditor, Page } from '@blocksuite/store';
import { type DatabaseBlockModel } from '@blocksuite/affine-model';
import { DatabaseBlockDataSource } from '../../../blocks/database/src/data-source';
import { propertyPresets } from '@blocksuite/data-view/property-presets';
import { DatabaseBlockMarkdownAdapter } from './database-block-adapter';
import type { MarkdownTableNode } from './type';

describe('DatabaseBlockMarkdownAdapter', () => {
  let editor: BlockSuiteEditor;
  let page: Page;
  let databaseModel: DatabaseBlockModel;
  let dataSource: DatabaseBlockDataSource;

  beforeEach(async () => {
    editor = new BlockSuiteEditor();
    // Ensure the editor is initialized, which should register default block schemas including 'affine:database'
    await editor.init();
    page = editor.createPage();
    await page.load();

    // Add a database block to the page
    const databaseBlockId = page.addBlock('affine:database');
    const block = page.getBlockById(databaseBlockId);
    if (!block) {
      throw new Error('Failed to create database block');
    }
    databaseModel = block.model as DatabaseBlockModel;
    dataSource = new DatabaseBlockDataSource(databaseModel);
  });

  afterEach(async () => {
    await editor.dispose();
  });

  it('should convert a database block with properties and rows to a markdown table node', async () => {
    // Add properties (columns)
    const namePropId = dataSource.propertyAdd('end', {
      type: propertyPresets.titlePropertyConfig.type,
      name: 'Name',
    });
    const statusPropId = dataSource.propertyAdd('end', {
      type: propertyPresets.multiSelectPropertyConfig.type,
      name: 'Status',
    });
    const datePropId = dataSource.propertyAdd('end', {
      type: propertyPresets.datePropertyConfig.type,
      name: 'Due Date',
    });

    expect(namePropId).toBeDefined();
    expect(statusPropId).toBeDefined();
    expect(datePropId).toBeDefined();

    // Add rows (records)
    const rowId1 = dataSource.rowAdd('end');
    const rowId2 = dataSource.rowAdd('end');

    expect(rowId1).toBeDefined();
    expect(rowId2).toBeDefined();

    // Set cell values for row 1
    dataSource.cellValueChange(rowId1, namePropId!, 'Task A');
    dataSource.cellValueChange(rowId1, statusPropId!, ['Todo']);
    dataSource.cellValueChange(rowId1, datePropId!, '2026-01-10');

    // Set cell values for row 2
    dataSource.cellValueChange(rowId2, namePropId!, 'Task B');
    dataSource.cellValueChange(rowId2, statusPropId!, ['Doing', 'Blocked']); // Test multiple select values
    dataSource.cellValueChange(rowId2, datePropId!, '2026-01-15');

    // Execute the adapter's convert method
    const markdownNode = DatabaseBlockMarkdownAdapter.convert(databaseModel);

    // Assert the output structure and content
    expect(markdownNode).toBeDefined();
    expect(markdownNode.type).toBe('table');

    const tableNode = markdownNode as MarkdownTableNode;

    expect(tableNode.header).toEqual(['Name', 'Status', 'Due Date']);
    expect(tableNode.rows).toEqual([
      ['Task A', 'Todo', '2026-01-10'],
      ['Task B', 'Doing,Blocked', '2026-01-15'], // String(array) becomes comma-separated string
    ]);
  });

  it('should handle a database block with no rows gracefully', async () => {
    // Add properties but no rows
    dataSource.propertyAdd('end', {
      type: propertyPresets.titlePropertyConfig.type,
      name: 'Name',
    });
    dataSource.propertyAdd('end', {
      type: propertyPresets.multiSelectPropertyConfig.type,
      name: 'Status',
    });

    const markdownNode = DatabaseBlockMarkdownAdapter.convert(databaseModel);

    expect(markdownNode).toBeDefined();
    expect(markdownNode.type).toBe('table');
    const tableNode = markdownNode as MarkdownTableNode;

    expect(tableNode.header).toEqual(['Name', 'Status']);
    expect(tableNode.rows).toEqual([]);
  });

  it('should handle a database block with no properties gracefully', async () => {
    // No properties, no rows
    const markdownNode = DatabaseBlockMarkdownAdapter.convert(databaseModel);

    expect(markdownNode).toBeDefined();
    expect(markdownNode.type).toBe('table');
    const tableNode = markdownNode as MarkdownTableNode;

    expect(tableNode.header).toEqual([]);
    expect(tableNode.rows).toEqual([]);
  });

  it('should handle null/undefined cell values as empty strings', async () => {
    const namePropId = dataSource.propertyAdd('end', {
      type: propertyPresets.titlePropertyConfig.type,
      name: 'Name',
    });
    const statusPropId = dataSource.propertyAdd('end', {
      type: propertyPresets.multiSelectPropertyConfig.type,
      name: 'Status',
    });

    const rowId1 = dataSource.rowAdd('end');
    const rowId2 = dataSource.rowAdd('end');

    dataSource.cellValueChange(rowId1, namePropId!, 'Task Alpha');
    // statusPropId for row1 is not set, dataSource.cellValueGet will return undefined, which becomes ''
    dataSource.cellValueChange(rowId2, statusPropId!, ['Done']);
    // namePropId for row2 is not set, dataSource.cellValueGet will return undefined, which becomes ''

    const markdownNode = DatabaseBlockMarkdownAdapter.convert(databaseModel);
    const tableNode = markdownNode as MarkdownTableNode;

    expect(tableNode.header).toEqual(['Name', 'Status']);
    expect(tableNode.rows).toEqual([
      ['Task Alpha', ''],
      ['', 'Done'],
    ]);
  });
});
