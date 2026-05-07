export const metadata = {
  title: "Studio",
  // Hint to search engines that this is a tool, not user content
  robots: "noindex,nofollow",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
