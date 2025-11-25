# Affine Repository Directory Structure

This document provides a comprehensive overview of the Affine repository's directory structure, derived from the supplied file summaries and file contents. Affine appears to be a large, multi-platform monorepo built primarily with TypeScript/JavaScript, React/LitElement, and Rust, leveraging reactive programming patterns and a GraphQL API.

## Top-Level Structure

The repository is organized into three main top-level directories: `blocksuite`, `packages`, and `tools`.

### `blocksuite`

This directory seems to host the core content editing and rendering engine, often referred to as the "BlockSuite." It's a foundational layer providing modular content blocks, graphics, data models, and a framework for extensions.

#### `blocksuite/affine/`
This sub-directory likely contains Affine-specific implementations and extensions built on top of the generic BlockSuite framework.

-   **`blocksuite/affine/blocks/`**: Defines the various types of content blocks available in the editor.
    -   `blocksuite/affine/blocks/bookmark/src/bookmark-block.ts`: Implements the `BookmarkBlockComponent` (a LitElement-based web component) for rendering and interacting with bookmark content. It includes logic for fetching and displaying link preview data, handling selection, and tracking citation events.
    -   `blocksuite/affine/blocks/code/src/code-block.ts`: Implements `CodeBlockComponent` extending `CaptionedBlockComponent`, handling preview state with signals, and using `InlineRangeProvider`. It manages syntax highlighting via `CodeBlockHighlighter` and integrates with comment managers.
    -   `blocksuite/affine/blocks/table/src/color.ts`: Defines `Color` type for table block coloring, indicating customizable styles.
-   **`blocksuite/affine/components/`**: Houses shared UI components used across the block suite (e.g., `icon-button/index.ts`, `toolbar/icon-button.ts`). These are often LitElement-based.
-   **`blocksuite/affine/data-view/`**: Focuses on data presentation, filtering, grouping, and type management for various data views within Affine.
    -   `blocksuite/affine/data-view/src/core/expression/types.ts`: Defines core types related to expression evaluation, such as `VariableRef` and `Value`, which might be used in dynamic filtering or calculations.
    -   `blocksuite/affine/data-view/src/core/group-by/types.ts`: Defines `GroupByConfig` and `AddToGroup` type for grouping data, along with `GroupRenderProps` for rendering groups. This suggests dynamic grouping capabilities.
    -   `blocksuite/affine/data-view/src/core/logical/type-system.ts`: Implements `TypeSystem` for managing type conversions and unification.
    -   `blocksuite/affine/data-view/src/core/logical/type-variable.ts`: Defines `TypeVarDefinitionInstance`, `TypeVarReferenceInstance`, and `TypeVarContext` for managing type variables, critical for a flexible data-typing system.
    -   `blocksuite/affine/data-view/src/core/logical/type.ts`: Defines `TypeInstance` and `Unify` interfaces, establishing a robust type system for data manipulation and validation, important for consistent data views.
    -   `blocksuite/affine/data-view/src/view-presets/table/pc-virtual/virtual/virtual-cell.ts`: Defines `VirtualElementWrapper` for virtualized table cells, indicating performance optimizations for large datasets by only rendering visible cells.
-   **`blocksuite/affine/ext-loader/`**: Manages the loading and registration of extensions.
    -   `blocksuite/affine/ext-loader/src/store-provider.ts`: Defines `StoreExtensionContext` type for store-related extension context.
    -   `blocksuite/affine/ext-loader/src/view-provider.ts`: Provides a specialized extension loader (`ViewExtensionProvider`) for view-related functionalities across different editor modes (page, edgeless, preview, mobile), including methods to check the current scope.
-   **`blocksuite/affine/gfx/`**: Contains graphics-related definitions and tools.
    -   `blocksuite/affine/gfx/model/vec.ts`: Defines `IVec` (2D vector) for 2D vector operations, used in graphics rendering.
    -   `blocksuite/affine/gfx/template/src/toolbar/template-type.ts`: Defines `Template` and `TemplateManager` interface for handling various types of content templates (e.g., articles, stickers).
    -   `blocksuite/affine/gfx/turbo-renderer/src/types.ts`: Defines `BlockLayout` interface for block rendering in the turbo renderer, along with `ViewportState` and `RenderingState` for optimized canvas rendering.
    -   `blocksuite/affine/blocks/surface/src/utils/rough/core.ts`: Defines `ResolvedOptions` for rough.js, suggesting a hand-drawn or sketch-like aesthetic for some graphical elements.
-   **`blocksuite/affine/model/`**: Defines core data models and constants for various elements and behaviors within the editor.
    -   `blocksuite/affine/model/src/blocks/divider/divider-model.ts`: Defines `DividerBlockModel` and its associated schema and extension.
    -   `blocksuite/affine/model/src/blocks/edgeless-text/edgeless-text-model.ts`: Defines `EdgelessTextBlockModel` extending `BlockModel` and implementing `GfxElementGeometry`, suggesting specific properties for edgeless text blocks like `color`, `fontFamily`, `fontWeight`, `fontStyle`, and `textAlign`.
    -   `blocksuite/affine/model/src/consts/mindmap.ts`: Defines enums for `LayoutType` and `MindmapStyle`, used for configuring mindmap appearance.
    -   `blocksuite/affine/model/src/elements/mindmap/snapshot/types.ts`: Defines `MindMapTreeNode`, `MindMapNode`, and `MindMapJson` types for mindmap snapshots, indicating support for mindmap structures.
    -   `blocksuite/affine/model/src/consts/connector.ts`: Defines `ConnectorEndpoint`, `PointStyle`, `ConnectorLabelOffsetAnchor`, and `ConnectorMode` for configuring connector appearance and behavior.
    -   `blocksuite/affine/model/src/consts/note.ts`: Defines constants and enums like `NoteShadow`, `NoteDisplayMode`, `StrokeStyle`, and `NoteCorners` for customizing note blocks, used for styling notes in different contexts.
    -   `blocksuite/affine/model/src/consts/shape.ts`: Defines `ShapeType` and `ShapeName` for different geometric shapes, along with utility functions to resolve them.
    -   `blocksuite/affine/model/src/consts/text.ts`: Defines text-related enums like `TextAlign`, `FontWeight`, `FontStyle`, and `FontFamily` for text styling.
    -   `blocksuite/affine/model/src/themes/color.ts`: Defines `ColorScheme` and `Color` types for managing theme colors (light/dark mode support).
-   **`blocksuite/affine/shared/`**: Houses shared types and utilities.
    -   `blocksuite/affine/shared/src/adapters/html/block-adapter.ts`: Defines `BlockHtmlAdapterMatcher` for HTML conversion.
    -   `blocksuite/affine/shared/src/adapters/markdown/block-adapter.ts`: Defines `BlockMarkdownAdapterMatcher` for Markdown conversion.
    -   `blocksuite/affine/shared/src/adapters/notion-html/block-adapter.ts`: Defines `BlockNotionHtmlAdapterMatcher` for Notion HTML conversion.
    -   `blocksuite/affine/shared/src/adapters/plain-text/block-adapter.ts`: Defines `BlockPlainTextAdapterMatcher` for plain text conversion. These adapters enable import/export from various sources.
    -   `blocksuite/affine/shared/src/services/telemetry-service/types.ts`: Defines `ElementCreationSource` for telemetry event tracking, capturing user actions.
    -   `blocksuite/affine/shared/src/services/toolbar-service/context.ts`: Defines `ToolbarContextBase` and `ToolbarContext` for managing editor toolbar state and actions.
    -   `blocksuite/affine/shared/src/types/uni-component.ts`: Defines `UniComponent` and `UniComponentReturn` types, likely for a framework-agnostic component interface, promoting reusable UI logic.
    -   `blocksuite/affine/shared/src/utils/drag-helper/types.ts`: Defines `OffsetList` for drag operations, indicating robust drag-and-drop support.
    -   `blocksuite/affine/shared/src/utils/insert.ts`: Defines `InsertToPosition` type and `arrayMove` utility for array manipulation, useful for reordering elements.
    -   `blocksuite/affine/shared/src/utils/signal.ts`: Defines `Observable` and `Unsubscribable` interfaces, indicating a reactive programming approach using signals (which `LiveData` in `packages/common/infra` might build upon).

#### `blocksuite/framework/`
This seems to be the underlying framework for BlockSuite itself, providing generic services, error handling, and data store functionalities.

-   **`blocksuite/framework/global/`**: Global framework components.
    -   `blocksuite/framework/global/src/__tests__/di.unit.spec.ts`: Contains unit tests for the dependency injection system, demonstrating basic usage, adding services with dependencies, and scope management, ensuring DI robustness.
    -   `blocksuite/framework/global/src/di/container.ts`: Defines `Container` class for dependency injection, including `ContainerEditor` for adding, overriding, and scoping services.
    -   `blocksuite/framework/global/src/di/provider.ts`: Defines `ServiceProvider` and `ServiceResolver` for managing service instantiation and dependencies. It handles circular dependencies and recursion limits.
    -   `blocksuite/framework/global/src/di/types.ts`: Defines `ServiceIdentifierValue`, `GeneralServiceIdentifier`, and `ServiceIdentifier` for robust dependency injection.
    -   `blocksuite/framework/global/src/disposable/index.ts`: Defines `DisposableGroup` for managing disposable resources, including event listeners, ensuring proper cleanup.
    -   `blocksuite/framework/global/src/exceptions/code.ts`: Defines `ErrorCode` enum, categorized by severity (fatal errors >= 10000).
    -   `blocksuite/framework/global/src/exceptions/index.ts`: Defines `BlockSuiteError` as a base error class for the block suite, along with `handleError` for consistent error reporting.
    -   `blocksuite/framework/global/src/gfx/model/vec.ts`: Defines `IVec`, `IVec3` and `Vec` class with static methods for vector operations (add, sub, len, rot, etc.). This is a core utility for graphical calculations.
    -   `blocksuite/framework/global/src/gfx/xywh.ts`: Defines `XYWH` and `SerializedXYWH` for rectangle serialization/deserialization, used for element positioning.
    -   `blocksuite/framework/global/src/types/virtual-keyboard.ts`: Defines `VirtualKeyboard` interface for interacting with on-screen keyboards.
    -   `blocksuite/framework/global/src/utils/id-generator.ts`: (Summary only) Defines `IdGenerator`.
    -   `blocksuite/framework/global/src/utils/logger.ts`: Defines `Logger` interface and `ConsoleLogger` / `NoopLogger` implementations, used for internal framework logging.
-   **`blocksuite/framework/std/`**: Standard library or common utilities within the framework.
    -   `blocksuite/framework/std/src/event/state/pointer.ts`: Defines `PointerEventState` and `MultiPointerEventState` for tracking pointer interactions, crucial for interactive editing.
    -   `blocksuite/framework/std/src/gfx/model/model.ts`: Defines `GfxModel` and `GfxGroupModel` for graphics models, used for rendering elements on the canvas.
    -   `blocksuite/framework/std/src/scope/std-scope.ts`: Defines `BlockStdScope` which aggregates core services and extensions for a block suite editor, acting as a central context.
    -   `blocksuite/framework/std/src/view/element/block-component.ts`: Defines `BlockComponent` class, the base for all block-related LitElements, providing common logic and context.
    -   `blocksuite/framework/std/src/view/element/lit-host.ts`: Defines `EditorHost` class, the main LitElement host for the BlockSuite editor, responsible for rendering child blocks and managing editor events.
-   **`blocksuite/framework/store/`**: Deals with the BlockSuite's data store and schema.
    -   `blocksuite/framework/store/src/extension/extension.ts`: Defines `Extension` abstract class and `ExtensionType` interface for extending BlockSuite functionality, with a detailed usage example.
    -   `blocksuite/framework/store/src/extension/workspace/workspace-meta.ts`: Defines `DocMeta` and `WorkspaceMeta` interfaces, crucial for managing document and workspace properties (e.g., tags, create date, trash status).
    -   `blocksuite/framework/store/src/model/block/block-model.ts`: Defines `BlockModel` class, the base data model for all blocks, including reactive children and property updates.
    -   `blocksuite/framework/store/src/reactive/text/text.ts`: Defines `Text` class, a reactive wrapper around Y.Text for collaborative rich text, providing methods for text manipulation with Yjs deltas.
    -   `blocksuite/framework/store/src/reactive/text/types.ts`: Defines `OptionalAttributes`, `DeltaOperation`, `OnTextChange`, and `DeltaInsert` types used for text manipulation, often seen in rich text editors.
    -   `blocksuite/framework/store/src/schema/error.ts`: Defines `SchemaValidateError` for schema validation failures.
    -   `blocksuite/framework/store/src/transformer/transformer.ts`: Implements the `Transformer` class for converting BlockSuite data (blocks, docs, slices) to/from snapshots, with middleware support for extensions (e.g., `replaceIdMiddleware`). This is essential for import/export and data migration.
    -   `blocksuite/framework/store/src/transformer/type.ts`: Defines `BlockSnapshot`, `SliceSnapshot`, `CollectionInfoSnapshot`, and `DocSnapshot` types, along with `BlobCRUD` and `DocCRUD` interfaces.
-   **`blocksuite/framework/sync/src/utils/async-queue.ts`**: Defines `AsyncQueue` and `PriorityAsyncQueue` classes for managing asynchronous tasks with optional priority.

### `packages`

This directory is a monorepo workspace for distinct, reusable modules or applications that form the larger Affine product.

#### `packages/backend/`
Contains server-side code and models.

-   **`packages/backend/server/src/__tests__/mocks/factory.ts`**: Defines an abstract `Mocker` class and `createFactory` function for generating mock data for database models, used in backend tests, ensuring consistent test data.
-   **`packages/backend/server/src/base/config/register.ts`**: Defines `ConfigDescriptor` and `defineModuleConfig` for managing application configuration, including validation against Zod schemas and environment variable parsing.
-   **`packages/backend/server/src/base/storage/providers/provider.ts`**: Defines interfaces for object storage like `StorageProvider`, `GetObjectMetadata`, `PutObjectMetadata`, `ListObjectsMetadata`, `BlobInputType`, and `BlobOutputType`.
-   **`packages/backend/server/src/mails/components/doc.tsx`**: Defines `DocProps` and `Doc` React component for rendering a document link within emails.
-   **`packages/backend/server/src/mails/components/template.tsx`**: Defines several React components (`Title`, `P`, `Text`, `SecondaryText`, `Bold`, `Avatar`, `OnelineCodeBlock`, `Name`, `AvatarWithName`, `Content`, `Button`, `Template`) for building reusable email templates.
    -   `packages/backend/server/src/mails/components/workspace.tsx`**: React component `Workspace` for generating email content related to workspaces, specifically for displaying workspace avatars and names using `AvatarWithName`.
-   **`packages/backend/server/src/models/common/doc.ts`**: Defines `Doc` interface for document metadata, `DocEditor` for tracking editors, `PublicDocMode` and `DocMode` enums for page/edgeless modes, indicating how documents are structured and tracked on the backend.
-   **`packages/backend/server/src/models/common/role.ts`**: Defines `DocRole` and `WorkspaceRole` enums for fine-grained access control within documents and workspaces.
-   **`packages/backend/server/src/plugins/payment/types.ts`**: Defines various types and enums related to payment, subscriptions (`SubscriptionPlan`, `SubscriptionRecurring`, `SubscriptionStatus`), invoices, and coupon types, indicating integration with payment gateways like Stripe and RevenueCat. It also includes global `Events` and `Jobs` interfaces for payment-related system events and background tasks.

#### `packages/common/`
This area holds code shared across different parts of the application, including frontend, backend, and various utilities.

-   **`packages/common/debug/src/index.ts`**: Implements a `DebugLogger` for consistent logging across the application.
-   **`packages/common/env/src/`**: Manages environment-related constants and configurations.
    -   `packages/common/env/src/constant.ts`: Defines utility error `Unreachable` for unreachable code paths, ensuring type safety.
    -   `packages/common/env/src/filter.ts`: Defines `LiteralValue` type for filtering, `Ref` for variable references, `Literal` for literal values, and `Filter` for filter rules, used in collection management.
    -   `packages/common/env/src/workspace/legacy-cloud/index.ts`: Defines `PermissionType` for legacy cloud workspace permissions, implying a historical state of access control.
-   **`packages/common/graphql/src/schema.ts`**: Defines GraphQL enums like `SubscriptionPlan` and `SubscriptionRecurring` (matching the backend payment types) and `Mutation` interface, indicating a strong reliance on a GraphQL API. It also includes `PublicDocMode` enum.
-   **`packages/common/infra/src/`**: Core infrastructure components.
    -   `packages/common/infra/src/framework/core/components/component.ts`: Defines generic `Component` class, the base for all framework components, providing core DI integration.
    -   **`packages/common/infra/src/framework/core/components/scope.ts`**: Defines a `Scope` class, extending `Component`, for managing hierarchical contexts or dependency scopes, providing access to framework services within a specific context.
    -   `packages/common/infra/src/framework/core/framework.ts`: Defines `Framework` class, the entry point for the dependency injection system, managing component factories.
    -   `packages/common/infra/src/framework/core/livedata/livedata.ts`: (Summary only) Implements `LiveData`. (Note: `livedata.ts` seems to be outside `framework/core` in the summary, so check this one carefully. It is `packages\common\infra\src\livedata\livedata.ts`).
    -   **`packages/common/infra/src/framework/core/provider.ts`**: Extends `FrameworkProvider` for the application's core framework, including `Resolver` for handling dependency resolution and `ComponentCachePool` for optimizing component instantiation. It tracks recursion and circular dependencies.
    -   **`packages/common/infra/src/framework/core/types.ts`**: Defines `Type`, `ComponentFactory`, `ComponentVariant`, `FrameworkScopeStack`, `IdentifierValue`, `GeneralIdentifier`, and `Identifier` for the application's dependency injection system.
    -   **`packages/common/infra/src/livedata/livedata.ts`**: Implements `LiveData`, an observable data stream for reactive state management, extending the generic `Observable` from `blocksuite/affine/shared`. It includes static `from` and `onComplete` methods.
    -   `packages/common/infra/src/orm/core/schema.ts`: Defines `FieldSchema`, `TableSchema`, `FieldSchemaBuilder`, and `f` (field factory) / `t` (table factory) utilities for ORM schema definition.
    -   `packages/common/infra/src/utils/async-queue.ts`: Defines `AsyncQueue` and `PriorityAsyncQueue` classes for managing asynchronous tasks with optional priority, and `SharedPriorityTarget`.
    -   `packages/common/infra/src/utils/object-pool.ts`: Implements `ObjectPool` for efficient object reuse and lifecycle management, often used for performance optimization.
-   **`packages/common/native/src/`**: Contains Rust code for native functionalities, exposed to other languages via FFI.
    -   `packages/common/native/src/doc_loader/splitter/options.rs`: Rust code for text splitter options, including `SplitterOptions` struct with configurable `chunk_size`, `chunk_overlap`, `model_name`, `encoding_name`, and `trim_chunks`, and conversion to `ChunkConfig<CoreBPE>` from `text_splitter` crate. This is likely for AI-related text processing.
    -   `packages/common/native/src/hashcash.rs`: Rust code for Hashcash implementation (`Stamp` struct with minting and checking logic), used for proof-of-work, potentially for rate limiting or anti-spam measures.
-   **`packages/common/nbstore/src/`**: Native database store, likely for local storage and indexing.
    -   `packages/common/nbstore/src/connection/connection.ts`: Defines `ConnectionStatus` and an `AutoReconnectConnection` abstract class for managing network connections with automatic retry logic, ensuring robust connectivity. Also includes `DummyConnection` for testing.
    -   `packages/common/nbstore/src/storage/indexer/document.ts`: Defines `IndexerDocument` interface, for creating indexable documents with fields, used for search.
    -   `packages/common/nbstore/src/storage/indexer/field-type.ts`: Defines `IndexFieldType` enum for different types of indexable fields.
-   **`packages/common/y-octo/`**: This module appears to be a CRDT (Conflict-free Replicated Data Type) library, primarily written in Rust and exposed to Node.js for performance.
    -   `packages/common/y-octo/core/benches/utils/files.rs`: Defines `File` and `Files` structs for loading binary fixtures used in benchmarks.
    -   **`packages/common/y-octo/core/src/doc/codec/mod.rs`**: Rust module declaration for codecs, re-exporting various CRDT-related types (`Any`, `Content`, `DeleteSet`, `Id`, `CrdtReader`, `CrdtWriter`, `RawDecoder`, `RawEncoder`, `Item`, `ItemRef`, `Parent`, `ItemFlag`, `Node`, and `Update`).
    -   **`packages/common/y-octo/core/src/codec/integer.rs`**: Rust functions `read_var_u64`, `write_var_u64`, `read_var_i32`, and `write_var_i32` for efficient variable-length integer encoding/decoding, used in Y-Octo's binary format.
    -   **`packages/common/y-octo/core/src/doc/codec/any.rs`**: Rust implementation for deserializing "any" JSON value into an `Any` enum, handling various primitive types, objects, and arrays for CRDT operations, including `serde` serialization/deserialization. This allows flexible data storage within Y-Octo.
    -   **`packages/common/y-octo/core/src/doc/codec/io/codec_v1.rs`**: Rust implementation of `RawDecoder` and `RawEncoder` as `CrdtReader` and `CrdtWriter` respectively, for encoding/decoding CRDT updates using a specific binary format (v1).
    -   `packages/common/y-octo/core/src/doc/codec/io/reader.rs`: Defines `CrdtReader` trait for reading CRDT binary data.
    -   `packages/common/y-octo/core/src/doc/codec/io/writer.rs`: Defines `CrdtWriter` trait for writing CRDT binary data.
    -   `packages/common/y-octo/core/src/doc/codec/update.rs`: Defines `Update` struct for CRDT updates, with methods like `decode_v1`, `encode_v1`, and `merge` for handling delta changes.
    -   **`packages/common/y-octo/core/src/doc/common/range.rs`**: Rust implementation of `OrderRange` for managing and manipulating ranges of `u64` (clocks/timestamps), with methods like `push`, `pop`, `merge`, `squash`, and `diff_range`, often used in CRDT state management.
    -   **`packages/common/y-octo/core/src/doc/document.rs`**: Rust core document model (`Doc`) with methods for creation, applying updates, encoding state, and accessing specific Y-types (Text, Array, Map). It includes `DocOptions` for configuration and integrates with history and publishing.
    -   `packages/common/y-octo/core/src/doc/types/array.rs`: Implements `Array` with `len`, `is_empty`, `get`, `insert`, `remove`, and `iter` methods.
    -   `packages/common/y-octo/core/src/doc/types/map.rs`: Implements `Map` with `insert`, `get`, `contains_key`, `remove`, `len`, `is_empty`, and various iterators.
    -   `packages/common/y-octo/core/src/doc/types/text.rs`: Implements `Text` with `len`, `is_empty`, `insert`, and `remove` methods.
    -   **`packages/common/y-octo/core/src/doc/types/value.rs`**: Rust enum `Value` encapsulating different Y-type values (Any, Doc, Array, Map, Text, XMLElement, XMLFragment, XMLHook, XMLText), used for rich data representation in CRDTs.
    -   **`packages/common/y-octo/core/src/sync.rs`**: Contains `loom_model` macro, suggesting concurrency testing utilities in Rust, crucial for CRDT correctness and race condition detection.
    -   `packages/common/y-octo/node/index.d.ts`: NAPI-RS auto-generated TypeScript declarations for Node.js bindings, including `Doc`, `YArray`, `YMap`, and `YText`.
    -   `packages/common/y-octo/node/src/array.rs`: Implements `YArray` and its `is_empty` method, with `insert`, `remove`, `toJson` methods and conversion from `Any` type.
    -   `packages/common/y-octo/node/src/map.rs`: Implements `YMap` with `length`, `is_empty`, `get`, `set`, `remove`, and `to_json` methods.
    -   **`packages/common/y-octo/node/src/doc.rs`**: Node.js bindings (`Doc` struct with `napi` attributes) for the Rust `Doc` type, exposing methods like `client_id`, `guid`, `get_or_create_array`, `apply_update`, and `encode_state_as_update_v1`. It also includes an `on_update` callback for reactive updates.
    -   **`packages/common/y-octo/node/src/text.rs`**: Node.js bindings (`YText` struct with `napi` attributes) for the Rust `Text` type, providing methods like `len`, `is_empty`, `insert`, `remove`, and `to_string`.
    -   `packages/common/y-octo/utils/benches/utils/files.rs`: Defines `File` and `Files` structs for loading binary fixtures used in `y-octo` benchmarks.

#### `packages/frontend/`
This directory contains all client-side application code.

-   **`packages/frontend/apps/android/`**: Android application code.
    -   `packages/frontend/apps/android/App/app/src/main/java/app/affine/pro/service/SSEService.kt`: Defines `SSEService` and `Event` data class in Kotlin for Server-Sent Events, used for streaming messages from the Copilot API.
-   **`packages/frontend/apps/ios/`**: Swift/iOS specific application code.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Operations/Queries/ListContextObjectQu`: (Summary only) Defines `ListContextObjectQuery` for GraphQL.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/AiJobStatus.graphql.swift`: Defines `AiJobStatus` enum (claimed, failed, finished, pending, running) for AI-related job states.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/DocMode.graphql.swift`: Defines `DocMode` enum (edgeless, page) for document modes.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/PublicDocMode.graphql.swi`: Swift enum mirroring GraphQL `PublicDocMode`.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/SubscriptionRecurring.gra`: Swift enum mirroring GraphQL `SubscriptionRecurring`.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/SubscriptionPlan.graphql.swift`: Swift enum mirroring GraphQL `SubscriptionPlan`, used in the iOS app.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Enums/SubscriptionStatus.graphq`: Swift enum mirroring GraphQL `SubscriptionStatus`.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/Objects/Mutation.graphql.swift`: Apollo GraphQL object definition for Mutations, indicating the client-side GraphQL interface.
    -   `packages/frontend/apps/ios/App/Packages/AffineGraphQL/Sources/Schema/SchemaMetadata.graphql.swift`: Contains metadata for the GraphQL schema.
    -   `packages/frontend/apps/ios/App/Packages/Intelligents/Sources/Intelligents/Intelligents.swift`: Defines `Intelligents` enum for grouping related Swift code.
    -   `packages/frontend/apps/ios/App/Packages/Intelligents/Sources/Intelligents/Interface/View/ChatCell/Vi`: (Summary only) Defines `LoadingCellViewModel` for chat cells.
-   **`packages/frontend/component/src/`**: Reusable frontend UI components.
    -   `packages/frontend/component/src/lit-react/create-component.ts`: Utility (`createComponent`) for creating React components that wrap LitElement web components, providing prop type safety and event handling for seamless integration.
    -   `packages/frontend/component/src/ui/modal/confirm-modal.tsx`: Defines `ConfirmModalProps` for confirmation modals, including options for custom buttons, callbacks, and mobile layouts.
    -   `packages/frontend/component/src/ui/radio/types.ts`: Defines `RadioProps` and `RadioItem` for customizable radio group components.
-   **`packages/frontend/core/src/`**: The main shared frontend application logic, potentially used by web, desktop, and mobile clients.
    -   `packages/frontend/core/src/blocksuite/ai/components/ai-chat-messages/type.ts`: Defines `StreamObjectSchema` and `ChatMessageSchema` for AI chat message structures, along with `HistoryMessage` type and `isChatAction`/`isChatMessage` type guards.
    -   **`packages/frontend/core/src/blocksuite/ai/peek-view/date-time.ts`**: LitElement component `DateTime` related to AI features, likely for displaying date/time information.
    -   `packages/frontend/core/src/blocksuite/ai/provider/error.ts`: Defines `BaseAIError` and `AIErrorType` (GeneralNetworkError, PaymentRequired, Unauthorized, RequestTimeout) for AI-related errors.
    -   **`packages/frontend/core/src/blocksuite/initialization/index.ts`**: Defines `DocProps` and `initDocFromProps` for initializing new documents with default blocks and properties, or from custom properties.
    -   `packages/frontend/core/src/components/atoms/index.ts`: Defines `openQuotaModalAtom` and `allPageFilterSelectAtom` using Jotai for global state management.
    -   `packages/frontend/core/src/components/explorer/docs-view/doc-list-item.css`: CSS styles for document list items within the explorer view.
    -   **`packages/frontend/core/src/components/explorer/docs-view/doc-list-item.tsx`**: React component `DocListItem` for displaying documents in a list or card view. It handles drag-and-drop, multi-selection, and quick actions, integrating with `DocsService` and `DocDisplayMetaService`. `MixId` is a utility for combining `groupId` and `docId`.
    -   `packages/frontend/core/src/desktop/dialogs/setting/account-setting/storage-progress.tsx`: Defines `StorageProgressProgress` interface for the storage progress component, showing usage and upgrade options.
    -   `packages/frontend/core/src/desktop/dialogs/setting/general-setting/plans/cloud-plans.tsx`: Defines `T` type for i18n usage in cloud plans.
    -   `packages/frontend/core/src/desktop/dialogs/setting/workspace-setting/preference/types.ts`: Defines `WorkspaceSettingDetailProps` for workspace setting panels.
    -   **`packages/frontend/core/src/components/root-app-sidebar/user-info/team-list.tsx`**: React component `TeamList` that displays workspaces, categorized by ownership (owner/member). It leverages `WorkspacesService` and `WorkspaceAvatar` to show team members' workspaces, including logic for handling clicks to jump to workspaces or open a workspace selector.
    -   `packages/frontend/core/src/mobile/components/rename/type.ts`: Defines `RenameBaseProps`, `RenameContentProps`, `RenameSubMenuProps`, and `RenameDialogProps` for mobile rename dialogs.
    -   **`packages/frontend/core/src/modules/`**: Contains modularized application features.
        -   `packages/frontend/core/src/modules/cloud/entities/server.ts`: Defines `Server` entity for cloud server metadata and features, including `credentialsRequirement` and a `revalidateConfig` effect.
        -   **`packages/frontend/core/src/modules/collection-rules/types.ts`**: Defines `FilterParams`, `GroupByParams`, and `OrderByParams` for managing rules in collections, indicating flexible data organization for smart folders.
        -   **`packages/frontend/core/src/modules/doc/services/docs.ts`**: Core service (`DocsService`) for managing documents. It handles opening, creating, duplicating (including from templates), and changing titles. It uses `ObjectPool` for `Doc` instances and integrates with BlockSuite's `Transformer` for content duplication, including ID replacement.
        -   **`packages/frontend/core/src/modules/editor-setting/schema.ts`**: Defines editor-specific settings schema (`EditorSettingSchema`), including `FontFamily` and `EdgelessDefaultTheme`, merging with `GeneralSettingSchema`.
        -   `packages/frontend/core/src/modules/feature-flag/types.ts`: Defines `FlagInfo` and `FeedbackType` for managing configurable features.
        -   **`packages/frontend/core/src/modules/pdf/renderer/types.ts`**: Defines types for PDF rendering, such as `PageSize`, `PDFMeta`, `RenderPageOpts`, and `RenderedPage`.
        -   `packages/frontend/core/src/modules/workbench/view/sidebar/sidebar-header.tsx`: Defines `HeaderProps` for sidebar header.
        -   **`packages/frontend/core/src/modules/workbench/entities/view.ts`**: Defines `View` entity for workbench tabs or views. It manages navigation history (`createNavigableHistory`), active sidebar tabs, scroll positions, title, icon, and query strings.
        -   **`packages/frontend/core/src/modules/workbench/scopes/view.ts`**: Defines `ViewScope` as a specialized `Scope` for managing view-specific dependencies within the workbench.
        -   `packages/frontend/core/src/modules/workspace-property/types.ts`: Defines `DateFilters`, `WorkspacePropertyTypes`, and `WorkspacePropertyType` for various property filters.
        -   **`packages/frontend/core/src/modules/workspace/`**: Logic for workspace management.
            -   `packages/frontend/core/src/modules/workspace/metadata.ts`: Defines `WorkspaceMetadata` type, including id, flavour, and possibly other properties.
            -   `packages/frontend/core/src/modules/workspace/open-options.ts`: Defines `WorkspaceOpenOptions` for opening workspaces.
            -   **`packages/frontend/core/src/modules/workspace/providers/flavour.ts`**: Defines `WorkspaceFlavourProvider` interface, which outlines methods for managing workspaces of a specific "flavour" (e.g., local, cloud), including creation, deletion, listing, and profile retrieval. Also defines `WorkspaceFlavoursProvider` to aggregate multiple providers.
            -   **`packages/frontend/core/src/modules/workspace/entities/list.ts`**: `WorkspaceList` entity manages a reactive list of `WorkspaceMetadata` from various `WorkspaceFlavourProvider`s, using `LiveData` and RxJS operators like `combineLatest` and `switchMap` to aggregate and revalidate workspace lists.
            -   **`packages/frontend/core/src/modules/workspace/entities/profile.ts`**: `WorkspaceProfile` entity manages specific workspace profile information (avatar, name, roles like owner/admin/team) for a given workspace. It uses `LiveData` to observe changes and `revalidate` to refresh data from its `WorkspaceFlavourProvider`.
            -   **`packages/frontend/core/src/modules/workspace/services/flavours.ts`**: `WorkspaceFlavoursService` is a service that aggregates multiple `WorkspaceFlavoursProvider` instances. It exposes a `flavours$` LiveData stream that combines the streams from all registered providers, effectively centralizing access to all workspace types.
            -   **`packages/frontend/core/src/modules/workspace/services/list.ts`**: `WorkspaceListService` provides access to the `WorkspaceList` entity, which manages the overall list of workspaces.
            -   **`packages/frontend/core/src/modules/workspace/services/profile.ts`**: `WorkspaceProfileService` manages a pool of `WorkspaceProfile` instances using an `ObjectPool` for efficient caching and retrieval of workspace profile data.
-   **`packages/frontend/mobile-native/src/lib.rs`**: Rust bindings for mobile native features, including `UniffiError`, `DocRecord`, `DocUpdate`, `DocClock`, `Blob`, `SetBlob`, `ListedBlob`, and `DocStoragePool` for interacting with native storage. This uses `uniffi` for cross-language FFI.
-   **`packages/frontend/i18n/src/i18n.gen.ts`**: Auto-generated internationalization (i18n) hooks (`useAFFiNEI18N`) and components (`TypedTrans`) for managing multi-language text. It contains a vast collection of translation keys, covering various UI elements, error messages, and feature descriptions.
-   `packages/frontend/native/index.d.ts`: NAPI-RS auto-generated TypeScript declarations for Node.js bindings, including `DocStoragePool` class, `Blob`, `DocClock`, `DocRecord`, `DocUpdate`, `ListedBlob`, `SetBlob`, and `SqliteConnection` for native access.
-   `packages/frontend/native/nbstore/src/error.rs`: Defines `Result<T>` and `Error` enum (SqlxError, MigrateError, InvalidOperation) for the native database store.
-   `packages/frontend/core/src/types/dnd.ts`: Defines `AffineDNDEntity` for drag-and-drop operations, and `AffineDNDData` to describe the data being dragged and the drop target.

### `tests`

Contains various testing utilities and end-to-end tests.

-   **`tests/blocksuite/e2e/utils/actions/edgeless.ts`**: Provides a rich set of Playwright-based helper functions for simulating user interactions within the Edgeless editor mode. This includes setting tools (brush, shape, note, text, connector, frame), adding elements, resizing, rotating, managing selections, and interacting with the component toolbar (e.g., changing colors, styles, modes). It also contains helpers for asserting editor state, manipulating zoom levels, and handling multi-touch gestures for testing.
-   **`tests/blocksuite/e2e/utils/bs-alternative.ts`**: Defines `NoteDisplayMode` enum, mirroring `blocksuite/affine/model/src/consts/note.ts`, along with utilities like `bound01`, `parseHexToRgba`, and `parseStringToRgba` for e2e testing of styling and display modes.
-   **`tests/kit/src/utils/editor.ts`**: Defines `EdgelessTool` type, mirroring the `edgeless.ts` actions, and provides utilities for interacting with the editor container, doc title, and edgeless mode controls in Playwright tests. Includes functions like `locateModeSwitchButton`, `ensureInPageMode`, `toViewCoord`, and `setEdgelessTool`.

### `tools`

This directory typically houses development, build, and utility scripts that support the project's infrastructure rather than being part of the main application.

-   **`tools/@types/env/__all.d.ts`**: Global TypeScript declaration file for environment variables (`Environment` type, `process.env`, `environment` global) and extending BlockSuite's `DocMeta` with Affine-specific properties like `favorite`, `trash`, `trashDate`, `updatedDate`, `mode`, and `isPublic`.
-   `tools/utils/src/path.ts`: Defines `Path` class for path manipulation, including joining, reading/writing files, checking existence, and converting to POSIX strings or file URLs.
-   **`tools/utils/src/logger.ts`**: Implements a `Logger` class using `chalk` for colored console output, useful for tooling and build processes.
-   `tools/utils/src/workspace.ts`: Defines `Workspace` class for monorepo workspace utilities.

## Key Architectural Patterns and Technologies

-   **Monorepo Structure**: Facilitates code sharing, consistent development, and independent versioning of various modules across different parts of the application.
-   **Block-based Editing (`BlockSuite`)**: A core engine for modular content, allowing for flexible and extensible content types, central to Affine's editing experience.
-   **Reactive Programming**: Extensive use of `LiveData` (a custom observable implementation based on RxJS), signals (`@preact/signals-core`), and RxJS operators (`combineLatest`, `switchMap`, `map`, `filter`) for dynamic and event-driven data management and UI updates. This is evident in state management within `packages/frontend/core` and `packages/common/infra`.
-   **Dependency Injection**: A custom DI system (in `blocksuite/framework/global/di` and `packages/common/infra/framework/core`) is heavily used for managing service instantiation, dependencies, and lifecycle within defined scopes, promoting modularity, testability, and extensibility.
-   **CRDTs (Y-Octo)**: The Rust-based `y-octo` library is a critical component for real-time collaborative editing and data synchronization, ensuring data consistency and conflict resolution across multiple clients without a central authority. Node.js bindings (`y-octo/node`) and mobile native bindings (`packages/frontend/mobile-native`) expose this functionality to JavaScript and mobile environments respectively.
-   **GraphQL**: Used for API interactions, with generated Swift types for the iOS application (`packages/frontend/apps/ios/App/Packages/AffineGraphQL`), indicating a well-defined and typed data fetching layer.
-   **Multi-Platform Support**: Evidence of web, desktop (inferred), iOS (Swift), and Android (Kotlin) development, suggesting a shared core with platform-specific adaptations and native integrations. `packages/frontend/mobile-native` specifically shows Rust bindings for mobile.
-   **Web Components (LitElement)**: Used for low-level, reusable UI components (e.g., `BookmarkBlockComponent`, `DateTime`) in `blocksuite/affine/blocks/` and `packages/frontend/core/src/blocksuite/`, allowing for encapsulated and framework-agnostic UI elements, integrated with React via `lit-react/create-component.ts`.
-   **React/JSX**: Widely used in the `packages/frontend/core/src/` for building complex UI components and application logic (e.g., `DocListItem`, `TeamList`, email templates in `packages/backend/server/src/mails`).
-   **Internationalization (i18n)**: Dedicated module (`packages/frontend/i18n`) with auto-generated hooks and components (`useAFFiNEI18N`, `TypedTrans`) for managing multi-language text, making the application localizable.
-   **End-to-End Testing (Playwright)**: Comprehensive e2e tests (in `tests/blocksuite/e2e` and `tests/kit`) for verifying application behavior, especially for complex UI interactions and editor functionalities like the Edgeless mode.
-   **Error Handling**: Centralized error codes (`ErrorCode`) and custom error classes (`BlockSuiteError`) in `blocksuite/framework/global/exceptions/` for consistent and categorized error management, with specific backend error codes in `packages/frontend/i18n/src/i18n.gen.ts`. AI-specific errors are also defined in `packages/frontend/core/src/blocksuite/ai/provider/error.ts`.
-   **Data Transformation**: The `Transformer` in `blocksuite/framework/store/src/transformer` plays a key role in converting data representations (blocks, docs, slices to/from snapshots), essential for import/export and compatibility. This includes support for various adapters (Markdown, HTML, Notion HTML, Plain Text).
-   **Configuration Management**: Backend configuration is managed via Zod schemas and environment variables (`packages/backend/server/src/base/config/register.ts`).
-   **Styling**: Use of CSS variables (e.g., in `blocksuite/affine/blocks/table/src/color.ts`) suggests a theming system. Rough.js in `blocksuite/affine/blocks/surface/src/utils/rough/core.ts` hints at sketch-like graphical elements.
-   **File Storage & Indexing**: The `packages/common/nbstore` related files, particularly `packages/common/nbstore/src/storage/indexer/document.ts`, indicate a local, possibly SQLite-based, storage and indexing system for documents and blobs, with connection management and auto-reconnect features.
-   **Virtual Keyboard Integration**: The `VirtualKeyboard` interface in `blocksuite/framework/global/src/types/virtual-keyboard.ts` suggests handling for on-screen virtual keyboards, likely for mobile or tablet interfaces.
-   **Drag and Drop**: Extensive DND support with specific entity types and drop targets defined in `packages/frontend/core/src/types/dnd.ts`.

This comprehensive structure details a sophisticated, feature-rich application emphasizing real-time collaboration, a flexible content model, and broad platform support.
