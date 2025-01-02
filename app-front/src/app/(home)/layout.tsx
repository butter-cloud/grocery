export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div>Home Layout</div>
      {children}
    </>
  )
}
