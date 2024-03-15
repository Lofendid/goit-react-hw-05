import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <p>Sorry, this page doesn&apos;t seem to exist.</p>
      <Link to="/">Go Home?</Link>
    </>
  );
}
