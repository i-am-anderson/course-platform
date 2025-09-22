import { useEffect, useRef, useState } from "react";

const useFetch = <T,>(url: RequestInfo | URL, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const optionsRef = useRef(options);

  optionsRef.current = options;

  useEffect(() => {
    // Reseta os estados quando a URL muda
    const controller = new AbortController();
    const { signal } = controller;

    // Função para buscar os dados
    const handleFetch = async () => {
      setLoading(true);
      setData(null);

      try {
        // Verifica se a URL é uma string ou um objeto URL
        const urlString = url instanceof URL ? url.href : url;

        // Faz a requisição com o sinal de abortamento
        const res = await fetch(urlString, { signal, ...optionsRef.current });

        // Verifica se a resposta é ok
        if (!res.ok) throw new Error(`Error: ${res.status}`);

        // Converte a resposta para JSON
        const json = (await res.json()) as T;

        // Se o componente ainda estiver montado, atualiza os estados
        if (!signal.aborted) setData(json);
      } catch (err) {
        // Se o erro não for por abortamento, atualiza o estado de erro
        if (!signal.aborted && err instanceof Error) setError(err.message);
      } finally {
        // Se o componente ainda estiver montado, atualiza o estado de loading
        if (!signal.aborted) setLoading(false);
      }
    };

    handleFetch();

    return () => {
      // Aborta a requisição em andamento, caso o componente seja desmontado ou a URL mude antes da finalização do fetch
      controller.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
