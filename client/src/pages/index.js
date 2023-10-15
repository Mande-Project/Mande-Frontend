import Layout from '@/src/components/Layout';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Index = () => {
  // Routing hook
  const router = useRouter();

  return (
    <>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Dashboard</h1>
      </Layout>
    </>
  );
};

export default Index;
