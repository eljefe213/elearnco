import {
  addObjectAtIndex,
  findObjectById,
  nanoid,
  removeObjectById,
  reorderObjectById,
  reorganizeIndexes,
  swapObjectsById,
} from "lib/utils";
import { ERoutes } from "schemas";
import { create } from "zustand";
import { Block } from "database";

interface State {
  blocks: Partial<Block>[];
  isLoading: boolean;
  error: unknown;
  page: any;
  currentPage: number;
  totalBlocks: number;
}

// Define the interface of the actions that can be performed in the Courses
interface Actions {
  fetchData: (id: string) => Promise<void>;
  addBlock: (blockIndex: number, draggedBlockType: Block) => void;
  removeBlock: (id: string) => void;
  duplicateBlock: (id: string) => void;
  moveDown: (id: string) => void;
  moveUp: (id: string) => void;
  reorderBlock: (blockIndex: number, draggedBlockType: Partial<Block>) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  blocks: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalBlocks: 1,
  page: [],
};

// Create the store with Zustand, combining the status interface and actions
export const usePageStore = create<State & Actions>((set, get) => ({
  blocks: INITIAL_STATE.blocks,
  isLoading: INITIAL_STATE.isLoading,
  error: INITIAL_STATE.error,
  currentPage: INITIAL_STATE.currentPage,
  totalBlocks: INITIAL_STATE.totalBlocks,
  page: INITIAL_STATE.page,

 
  fetchData: async (id: string): Promise<void> => {
    try {
      set({ isLoading: true, error: null });
      const response = await fetch(`/api/${ERoutes.PAGE}/${id}`);
      const data = await response.json();

      set({
        page: data[0],
        blocks: [
          {
            index: 0,
            uuid: "bloc 0",
            content: "bloc 0",
            groupId: "group_1",
            type: "warning",
          },
          {
            index: 1,
            uuid: "bloc 1",
            content: "bloc 1",
            groupId: "group_1",
            type: "audio",
          },
          {
            index: 2,
            uuid: "bloc 2",
            content: "bloc 2",
            groupId: "group_1",
            type: "video",
          },
          {
            index: 3,
            uuid: "bloc 3",
            content: "bloc 3",
            groupId: "group_1",
            type: "timeline",
          },
        ],
        //data[0].blocks,
        isLoading: false,
        totalBlocks: Number(data[0]?.blocks?.length),
      });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addBlock: (index: number, blocType: Partial<Block>): void => {
   
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const newBlocks = addObjectAtIndex(cloneblocks, index, {
      uuid: nanoid(12),
      index: blocks.length + 1,
      content: JSON.stringify(blocType),
      type: blocType as string,
    });

    const reorderNewBlocks = reorganizeIndexes(newBlocks);
    set((state) => ({ state, ...{ blocks: reorderNewBlocks } }));
  },
  duplicateBlock: (id: string): void => {
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const block = findObjectById(cloneblocks, id);
    const index = block?.index;
    if (index !== undefined) {
      const newBlocks = addObjectAtIndex(cloneblocks, index + 1, {
        ...block,
        uuid: nanoid(12),
      });
      const reorderNewBlocks = reorganizeIndexes(newBlocks);
      set((state) => ({ state, ...{ blocks: reorderNewBlocks } }));
    }
  },
  reorderBlock: (
    blockIndex: number,
    draggedBlockType: Partial<Block>
  ): void => {
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const newBlocks = reorderObjectById(
      cloneblocks,
      draggedBlockType.uuid as string,
      blockIndex
    );

    set((state) => ({ state, ...{ blocks: newBlocks } }));
  },
  removeBlock: (id: string): void => {
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const newBlocks = removeObjectById(cloneblocks, id);
    const reorderNewBlocks = reorganizeIndexes(newBlocks);
    set((state) => ({ state, ...{ blocks: reorderNewBlocks } }));
  },
  moveDown: (id: string): void => {
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const newBlocks = swapObjectsById(cloneblocks, id, "down");

    set((state) => ({ state, ...{ blocks: newBlocks } }));
  },
  moveUp: (id: string): void => {
    const blocks = get().blocks;
    const cloneblocks = [...blocks];
    const newBlocks = swapObjectsById(cloneblocks, id, "up");
    set((state) => ({ state, ...{ blocks: newBlocks } }));
  },
}));
