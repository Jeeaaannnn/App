import PieSvg from "@/assets/images/boarding/pie.svg";
import CoinSvg from "@/assets/images/boarding/coin.svg";
import WalletSvg from "@/assets/images/boarding/wallet.svg";
import HouseSvg from "@/assets/svg/house.svg";
import InvitaAmicoSvg from "@/assets/svg/invita_amico.svg";
import GiftBoxSvg from "@/assets/svg/gift_box.svg";

export const cardList = [
  {
    head: "Scopri la",
    title: "Cessione del Quinto",
    description:
      "Puoi richiederla in modo \n semplice e veloce \n direttamente online.",
    Svg: PieSvg,
  },
  {
    head: "Scopri la",
    title: "Delega di Pagamento",
    description:
      "Puoi ottenere ulteriore \n liquidità rimborsando il tutto \n con rate mensili pari a due \n quinti dello stipendio.",
    Svg: CoinSvg,
  },
  {
    head: "Scopri i",
    title: "Prestiti Personali",
    description:
      "Grazie ai nostri Prestiti \n hai tutta la libertà di \n scegliere ciò che è più \n comodo per te.",
    Svg: WalletSvg,
  },
  {
    head: "Scopri i",
    title: "Mutui",
    description:
      "Per te un'ampia selezione \n di soluzioni personalizzate \n per accompagnarti \n verso la casa dei tuoi sogni.",
    Svg: HouseSvg,
  },
  {
    head: "Presenta un amico",
    title: "Guadagna 100 euro \n per ogni amico \n che presenti!",
    description: "",
    Svg: InvitaAmicoSvg,
  },
  {
    head: "Diventa nostro cliente",
    title: "Più punti accumuli \n più premi ricevi",
    description: "Più punti Fidelity \n totalizzerai \n più premi riceverai",
    Svg: GiftBoxSvg,
  },
];

export const TCard = typeof cardList[0];

// const defaultElements = [
//   // {
//   //   Icon: Ionicons,
//   //   IconType: "newspaper-outline",
//   //   label: "Bozza Preventivo",
//   //   href: "(modal)/bozza",
//   //   // type: "modal",
//   // },
//   // {
//   //   Icon: Ionicons,
//   //   IconType: "newspaper-outline",
//   //   label: "Secci",
//   //   href: "/",
//   // },
//   {
//     Icon: Ionicons,
//     IconType: "wallet-outline",
//     label: "Deleghe Pagamento",
//     href: "/",
//   },
//   {
//     Icon: MaterialIcons,
//     IconType: "attach-money",
//     label: "Prestiti Personali",
//     href: "/",
//   },
// ];
