import { GetServerSideProps, NextPage } from 'next';
import React from 'react';
import { ProductGrid } from '../../components/ProductGrid';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return { props: { categoryId: query.slug } };
};

const Category: NextPage = ({ categoryId }: any) => {
  return (
    <ProductGrid categoryId={categoryId} />
  );
};

export default Category;
