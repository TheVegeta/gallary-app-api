import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface IUserInfo {
  email: string;
  jwt: string;
  name: string;
  isAuth: boolean;
}

interface AppState {
  userInfo: IUserInfo;
  setAuthTrue: (arg0: IUserInfo) => void;
  setAuthFalse: () => void;
}

export const useAppState = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        userInfo: {
          email: "",
          isAuth: false,
          jwt: "",
          name: "",
        },
        setAuthTrue: (arg0) =>
          set((state) => ({
            userInfo: arg0,
          })),
        setAuthFalse: () =>
          set((state) => ({
            userInfo: {
              email: "",
              isAuth: false,
              jwt: "",
              name: "",
            },
          })),
      }),
      {
        name: "bear-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
