import { usePathname } from "next/navigation";

export function useIsCollaboration(path: string): boolean {
  const pathname = usePathname();
  const isCollaboration = pathname?.startsWith(`/${path}`);

  return isCollaboration;
}
