import { Carousel } from "./Carousel";
import { CarouselItem } from "./DocumentItem";
import { cardMessageFormat } from "@/utils/whatsapp";
import ConteggioEstintivo from "@/assets/svg/conteggio_estintivo.svg";
import CopiaContratto from "@/assets/svg/copia_contratto.svg";
import Secci from "@/assets/svg/secci.svg";
import { Case } from "@/interfaces/case.interface";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import helpersApi from "@/utils/api/helpers.api";
import { router } from "expo-router";

interface IProps {
  selected: { type: string; data: Case | null } | null;
  //   loading: boolean;
}

export function DocumentsCarousel(props: IProps) {
  const [data, setData] = useState<null | any>(null);
  const { t } = useTranslation("", { keyPrefix: "screens.home" });
  const abortController = new AbortController();

  const loadData = useCallback(async () => {
    const result = await helpersApi.getMyConsultantInfo(abortController);
    setData(result.data);
  }, [abortController]);

  useEffect(() => {
    loadData();
  }, []);

  if (!props.selected || !props.selected.data) return;
  if (props.selected.data.status !== "LIQUIDATA") return;
  const baseMessage =
    "Richiesta {{ tipo }} relativo al finanziamento n° {{ pratica }}";
  const pratica = props.selected.data.id;
  const defaultContactPhone = "0393940911";
  const phone = !data || data.phone === "" ? defaultContactPhone : data.phone;

  return (
    <Carousel itemPerPage={3}>
      <CarouselItem
        Icon={ConteggioEstintivo}
        label={t("documentsCarousel.extintCounting.label")}
        href={cardMessageFormat(phone, baseMessage, {
          tipo: t("documentsCarousel.extintCounting.message"),
          pratica,
        })}
      />
      <CarouselItem
        Icon={CopiaContratto}
        label={t("documentsCarousel.contract.label")}
        href={cardMessageFormat(phone, baseMessage, {
          tipo: t("documentsCarousel.contract.message"),
          pratica,
        })}
      />
      <CarouselItem
        Icon={Secci}
        label={t("documentsCarousel.secci.label")}
        href={cardMessageFormat(phone, baseMessage, {
          tipo: t("documentsCarousel.secci.message"),
          pratica,
        })}
      />
    </Carousel>
  );
}
