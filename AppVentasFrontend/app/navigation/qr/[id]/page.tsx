import QRLandingPage from "../../../../src/features/qr-landing/QRLandingPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <QRLandingPage promoterId={id} />;
}