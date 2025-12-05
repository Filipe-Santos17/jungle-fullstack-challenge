import { useEffect } from 'react';
import { useRouter, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/')({
  component: RouteComponent,
})

function RouteComponent() {
  const router = useRouter();
  
  useEffect(() => {
    router.navigate('/auth/login');
  }, [])

  return <></>;
}