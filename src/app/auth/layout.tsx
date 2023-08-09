export const metadata = {
  title: "Experiment Hub",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="flex flex-1 p-6">{children}</main>;
}
