import { useMutation, useQuery } from "@tanstack/react-query";
import type { UserType } from "../backend";
import { useActor } from "./useActor";
import { useInternetIdentity } from "./useInternetIdentity";

export interface SignupData {
  name: string;
  email: string;
  phone: string;
  userType: UserType;
  numberOfProperties?: bigint;
}

export function useSubmitSignup() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: SignupData) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitEarlyAccessSignup(
        data.name,
        data.email,
        data.phone,
        data.userType,
        data.numberOfProperties ?? 0n,
      );
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  const { identity } = useInternetIdentity();
  return useQuery<boolean>({
    queryKey: ["isCallerAdmin", identity?.getPrincipal().toString()],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && !!identity,
  });
}

export function useGetAllSignups() {
  const { actor, isFetching } = useActor();
  const { data: isAdmin } = useIsCallerAdmin();
  return useQuery({
    queryKey: ["allSignups"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllSignups();
    },
    enabled: !!actor && !isFetching && !!isAdmin,
  });
}
