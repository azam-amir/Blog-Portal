import { v4 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      data: [],

      add: (newData) => {
        const dataWithId = {
          id: v4(),
          createdAt: new Date().toISOString(),
          ...newData,
        };
        set((state) => ({
          data: [dataWithId, ...state.data],
        }));
      },

      update: (updatedData) => {
        set((state) => {
          const updatedArr = state.data.map((item) =>
            item.id === updatedData.id
              ? { ...item, ...updatedData, updatedAt: new Date().toISOString() }
              : item
          );
          return { data: updatedArr };
        });
      },

      remove: (id) => {
        set((state) => {
          const updatedArr = state.data.filter((item) => item.id !== id);
          return { data: updatedArr };
        });
      },
    }),

    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);
