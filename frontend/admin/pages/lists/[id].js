import React, { useEffect, useState } from "react";

import DataList from "../../components/forms/dataList";

const EditList = ({ list }) => {
  return <DataList lists={list} />;
};

export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/lists`);
  const lists = await res.json();
  const paths = lists.map(list => {
    return {
      params: {
        id: list.id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/lists/${params.id}`);
  const list = await res.json();
  return {
    props: {
      list,
    },
  };
}

export default EditList;
