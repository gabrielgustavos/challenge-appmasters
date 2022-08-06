export const types = [
  { deviceName: "Notebook", id: "notebook" },
  { deviceName: "Desktop", id: "desktop" },
  { deviceName: "Netbook", id: "netbook" },
  { deviceName: "Monitor", id: "screen" },
  { deviceName: "Impressora", id: "printer" },
  { deviceName: "Scanner", id: "scanner" },
];

export const conditions = [
  {
    deviceName: "Tem todas as partes, liga e funciona normalmente",
    id: "working",
  },
  { deviceName: "Tem todas as partes, mas não liga mais", id: "notWorking" },
  {
    deviceName: "Faltam peças, funciona só as vezes ou está quebrado",
    id: "broken",
  },
];