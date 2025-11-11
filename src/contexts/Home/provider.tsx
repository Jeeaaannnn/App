import { HomeContext } from "./context";
import { ReactNode, useCallback, useEffect, useState } from "react";
import casesApi from "@/utils/api/cases.api";
import { Case } from "@/interfaces/case.interface";
import { useSharedValue } from "react-native-reanimated";
import { tryCatch } from "@/utils/store";

export function HomeProvider(props: { children: ReactNode }) {
  const [headerHeight, setHeaderHeight] = useState<number>(100);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<{ data: Case; type: string }[] | null>(null);
  const headerHeightValue = useSharedValue(0);
  const abortController = new AbortController();

  const fetchData = useCallback(async () => {
    const noneCase = { type: "new", data: null };
    const list = [];
    const [caseError, caseResult] = await tryCatch(
      casesApi.getCases(abortController)
    );

    // const [cases, requests] = await Promise.all([
    //   tryCatch(casesApi.getCases(abortController)),
    //   tryCatch(casesApi.getSomething(abortController))
    // ])
    // const [caseError, caseResult] = cases
    // const [requestError, requestResult] = requests

    // if(requestError) {
    // Do something
    // return
    // }

    if (caseError) {
      setLoading(false);
      // Do something if went wromng
      return;
    }

    if (caseResult.data.total > 0) {
      for (const el of caseResult.data.items) {
        const caseRes = await casesApi.getCase(abortController, el.id);
        list.push({ type: "", data: { ...caseRes.data, id: el.id } });
      }
    }

    // if (requestResult.data.total > 0) {
    //   for (const el of requestResult.data.items) {
    //     dataList.push({ type: "requested", data: el });
    //   }
    // }

    list.push(noneCase);
    setLoading(false);
    setData([...list]);
  }, [abortController]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <HomeContext.Provider
      value={{
        headerHeight,
        setHeaderHeight,
        loading,
        setLoading,
        data,
        setData,
        headerHeightValue,
      }}
    >
      {props.children}
    </HomeContext.Provider>
  );
}
