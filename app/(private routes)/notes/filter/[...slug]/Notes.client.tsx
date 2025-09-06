'use client';

import { keepPreviousData, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';
import Loader from '@/components/Loader/Loader';

import Error from '../../error';
import Link from 'next/link';
import { fetchNotes } from '@/lib/api/clientApi';

interface NotesClientProps {
  tag?: string;
}

const NotesClient = ({ tag }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['notes', page, search, tag],
    queryFn: () => fetchNotes(page, search, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const onPageChange = (page: number) => {
    setPage(page);
  };

  const onChangeSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 1000);

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox onChange={onChangeSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onChange={onPageChange}
          />
        )}
        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </div>
      {isLoading && !data && <Loader />}
      {isError && error && <Error error={error as Error} />}
      {isSuccess && data && data?.notes.length > 0 ? (
        <NoteList notes={data.notes} />
      ) : (
        !isLoading && <p>Notes not found</p>
      )}
    </div>
  );
};

export default NotesClient;
