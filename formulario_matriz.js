const STORAGE_KEY = "condapav_matriz_respostas_v1";

const parts = [
  "Arquitetura operacional",
  "Indicadores físicos",
  "Metas e etapas",
  "Itens de despesa",
  "Coerência financeira",
  "Decisões operacionais"
];

const architecture = [
  ["A-01", "Coleta seletiva de secos", ["Prefeitura", "CONDAPAV", "Terceirizada", "Cooperativa", "Catadores autônomos", "Híbrido"], ["Prefeitura", "Consórcio", "Rateio", "Receita reciclagem"]],
  ["A-02", "Coleta seletiva de orgânicos", ["Prefeitura", "CONDAPAV", "Terceirizada", "Cooperativa"], ["Prefeitura", "Consórcio"]],
  ["A-03", "Operação dos PEVs", ["Servidores municipais", "Vigias", "Cooperativa", "UTC", "Sem operador"], ["Município", "CONDAPAV"]],
  ["A-04", "Controle de entrada nos PEVs", ["Operador fixo", "Câmera", "Sem controle"], ["Município"]],
  ["A-05", "Operação da UTC", ["Servidores efetivos", "Contratados", "Cooperativa", "Associação", "Catadores autônomos", "Modelo híbrido"], ["Prefeitura de Cristiano Otoni", "Consórcio", "Receita venda recicláveis"]],
  ["A-06", "Operação do pátio de compostagem", ["Equipe própria UTC", "Cooperativa", "Terceirizada"], ["Consórcio", "Receita venda composto"]],
  ["A-07", "Mobilização social", ["Consultoria contratada", "Educação ambiental municipal", "Mobilizadores locais", "Agentes de saúde", "Escolas"], ["Município", "Consórcio"]],
  ["A-08", "SIGRS", ["Empresa contratada", "SaaS", "Desenvolvimento próprio"], ["Consórcio - licença/manutenção"]],
  ["A-09", "Operação contínua do SIGRS", ["Equipe interna", "Suporte do fornecedor", "Híbrido"], ["Consórcio"]],
  ["A-10", "Educação ambiental - oficinas", ["Consultoria", "Equipe municipal", "ONG parceira", "Escolas"], ["Município"]],
  ["A-11", "Pagamento PSA", ["Consórcio - conta vinculada", "Prefeituras - rateio", "Fundo Municipal de Meio Ambiente"], ["Definir fonte permanente"]],
  ["A-12", "Combustível, manutenção e energia da operação", ["Município", "Consórcio", "Não previsto no projeto - auto-sustentação"], ["Confirmação obrigatória de fonte"]]
].map(([id, title, executor, funding]) => ({
  id,
  part: parts[0],
  title,
  meta: { "Código": id.replace("A-", ""), "Tipo": "Decisão de arquitetura" },
  groups: [
    { key: "executor", label: "Quem executa", choices: executor },
    { key: "funding", label: "Quem custeia pós-projeto", choices: funding },
    { key: "decision", label: "Decisão", choices: ["Confirmado", "Pendente de diretoria", "Depende de município", "Depende de orçamento", "Não se aplica"] }
  ],
  fields: ["Responsável", "Prazo", "Justificativa / observação"]
}));

const indicators = [
  ["Massa", "Resíduos recicláveis secos coletados", "t/mês", "Planilha de pesagem UTC + nota fiscal de venda"],
  ["Massa", "Resíduos orgânicos coletados", "t/mês", "Planilha de pesagem entrada pátio"],
  ["Massa", "Composto produzido", "t/mês", "Planilha de pesagem saída pátio"],
  ["Cobertura", "Municípios atendidos", "nº", "Termo de adesão municipal"],
  ["Cobertura", "PEVs implantados", "nº", "Termo de recebimento + ART + foto"],
  ["Cobertura", "Hortas comunitárias implantadas", "nº", "Termo de compromisso + foto + ata"],
  ["Cobertura", "Escolas atendidas com educação ambiental", "nº", "Ofício + lista de presença + relatório"],
  ["Cobertura", "Composteiras domésticas distribuídas", "nº", "Termo de entrega assinado"],
  ["Capacitação", "Operadores capacitados", "nº pessoas", "Lista de presença + certificado"],
  ["Capacitação", "Mobilizadores capacitados", "nº pessoas", "Lista de presença + certificado"],
  ["Capacitação", "Catadores capacitados", "nº pessoas", "Lista de presença + certificado"],
  ["Capacitação", "Oficinas realizadas", "nº", "Ata + lista de presença + foto"],
  ["PSA", "Catadores aderidos ao PSA", "nº pessoas", "Termo de adesão assinado"],
  ["PSA", "Recicláveis coletados pelos catadores PSA", "t/mês", "Recibo de pesagem"],
  ["Documentos", "Diagnósticos elaborados", "nº", "Relatório protocolado"],
  ["Documentos", "Planos elaborados", "nº", "Plano protocolado"],
  ["Documentos", "Projetos executivos elaborados", "nº", "Projeto + ART"],
  ["Documentos", "Regulamentos elaborados", "nº", "Regulamento publicado"],
  ["Documentos", "Relatórios técnicos emitidos", "nº", "Relatório protocolado"],
  ["Obras", "Obras executadas", "nº", "Termo de recebimento + ART"],
  ["Sistema", "Módulos do SIGRS desenvolvidos", "nº", "Termo de aceite + manual"],
  ["Sistema", "Canais públicos de denúncia ativos", "nº", "URL + relatório de uso"],
  ["Comunicação", "Peças gráficas produzidas/impressas", "nº", "Notas fiscais + amostras"],
  ["Comunicação", "Vídeos institucionais produzidos", "nº", "Entrega digital + termo de aceite"]
].map(([category, title, unit, source], index) => ({
  id: `C-${String(index + 1).padStart(2, "0")}`,
  part: parts[1],
  title,
  meta: { "Categoria": category, "Unidade": unit, "Fonte original": source },
  groups: [
    { key: "use", label: "Uso do indicador", choices: ["Usar", "Adaptar", "Excluir", "Aguardando definição"] },
    { key: "proof", label: "Comprovação", choices: source.split(" + ").concat(["Foto", "Ata", "Lista de presença", "Termo de aceite"]).filter(unique) }
  ],
  numbers: [{ key: "target", label: `Meta quantitativa (${unit})` }],
  fields: ["Responsável", "Observação"]
}));

const stages = [
  ["01.01", "Planejamento e roteirização da coleta seletiva", "Meta 1", ["Relatório de Diagnóstico", "Plano Logístico", "Roteiro de Operação"]],
  ["01.02", "Capacitação de mobilizadores e lançamento do Programa de Coleta Seletiva Intermunicipal", "Meta 1", ["Plano de Mobilização", "Mobilizadores capacitados", "Evento de lançamento"]],
  ["01.03", "Estudos e implantação dos PEVs nos municípios", "Meta 1", ["PEVs implantados", "Número por município definido"]],
  ["01.04", "Capacitação de operadores dos PEVs e ações de sensibilização da população", "Meta 1", ["Operadores capacitados", "Ações de sensibilização"]],
  ["01.05", "Operacionalização da coleta seletiva em todos os municípios consorciados", "Meta 1", ["t/mês de secos", "t/mês de orgânicos", "Rotas operadas"]],
  ["01.06", "Acompanhamento da logística da coleta seletiva e das atividades de mobilização", "Meta 1", ["Relatórios de monitoramento", "Revisão do Plano Logístico", "Revisão do Plano de Mobilização"]],
  ["01.07", "Sensibilização ambiental para coleta seletiva", "Meta 1", ["Peças gráficas", "Vídeos", "Posts produzidos"]],
  ["01.08", "Criação de canal público e desenvolvimento do SIGRS", "Meta 1", ["Canal ativo", "Módulos do SIGRS desenvolvidos"]],
  ["01.09", "Consolidação final dos indicadores e Relatório de Cumprimento de Objeto Final", "Meta 1", ["Relatório de Cumprimento de Objeto Final"]],
  ["02.01", "Projetos Executivos de Engenharia para reestruturação da UTC", "Meta 2", ["Projeto Executivo", "ART"]],
  ["02.02", "Avaliação e reestruturação dos processos internos da UTC", "Meta 2", ["POPs elaborados", "Oficinas"]],
  ["02.03", "Obras e serviços de engenharia para reestruturação da UTC", "Meta 2", ["Obra concluída", "m² reformados"]],
  ["02.04", "Aquisição e instalação de equipamentos para a UTC", "Meta 2", ["Equipamentos individualizados"]],
  ["02.05", "Capacitação para uso de novos equipamentos e operação do SIGRS", "Meta 2", ["Pessoas capacitadas", "Oficinas"]],
  ["02.06", "Operação e monitoramento da UTC revitalizada", "Meta 2", ["t/mês de recicláveis beneficiados", "Relatórios mensais"]],
  ["03.01", "Projeto de Readequação do Pátio de compostagem", "Meta 3", ["Projeto Executivo", "ART", "Drenagem contemplada"]],
  ["03.02", "Plano Operacional de Compostagem e Aproveitamento do Composto Produzido", "Meta 3", ["Plano Operacional"]],
  ["03.03", "Obras e serviços de engenharia para readequação do pátio de compostagem", "Meta 3", ["Obra concluída", "m² readequados"]],
  ["03.04", "Capacitação dos operadores do pátio e mobilizadores municipais", "Meta 3", ["Operadores capacitados", "Mobilizadores capacitados"]],
  ["03.05", "Operacionalização e monitoramento da compostagem e composteiras domésticas", "Meta 3", ["t/mês de orgânicos compostados", "t/mês de composto produzido", "Composteiras distribuídas"]],
  ["03.06", "Implantação de hortas comunitárias e educação ambiental", "Meta 3", ["Hortas implantadas", "Termos de compromisso", "Escolas atendidas"]],
  ["04.01", "Regulamento e gestão do Programa PSA", "Meta 4", ["Regulamento publicado"]],
  ["04.02", "Mapeamento e cadastramento de catadores autônomos", "Meta 4", ["Catadores mapeados", "Catadores cadastrados"]],
  ["04.03", "Capacitação e adesão ao Programa PSA", "Meta 4", ["Catadores capacitados", "Termos de adesão assinados", "Oficinas nos 6 municípios"]],
  ["04.04", "Operacionalização do Programa PSA aos catadores", "Meta 4", ["Catadores ativos no PSA", "t/mês de recicláveis coletados", "Pagamentos efetuados"]]
].map(([code, title, meta, indicators]) => ({
  id: `E-${code}`,
  part: parts[2],
  title,
  meta: { "Etapa": code, "Meta": meta },
  groups: [
    { key: "validated", label: "Validação da etapa", choices: ["Manter", "Revisar redação", "Revisar indicadores", "Revisar itens vinculados", "Não se aplica"] },
    { key: "indicators", label: "Indicadores vinculados", choices: indicators }
  ],
  numbers: indicators.map((label, index) => ({ key: `q${index + 1}`, label })),
  fields: ["Município/local", "Responsável", "Observação"]
}));

const expensesRaw = [
  ["01.01", "Materiais permanentes (notebook+impressora)", "Desmembrar", "Notebook + Impressora multifuncional laser", "44.90.52", "Especificação final"],
  ["01.01", "Consultorias técnicas", "Renomear", "Elaboração do diagnóstico da coleta seletiva", "33.90.39", "Produtos + qualificação"],
  ["01.01", "Serviços de impressão", "Avaliar suprimir", "-", "-", "DECISÃO"],
  ["01.02", "Consultorias técnicas", "Renomear", "Capacitação de mobilizadores da coleta seletiva", "33.90.39", "Produtos + qualificação"],
  ["01.02", "Materiais gráficos", "Detalhar", "Folders + Cartazes", "33.90.30", "Quantidades"],
  ["01.02", "Kits pedagógicos", "Renomear + detalhar", "Kits pedagógicos para mobilizadores", "33.90.30", "Quantidade por kit"],
  ["01.02", "Estrutura de eventos", "Detalhar", "Estrutura de evento de lançamento", "33.90.39", "Definir composição"],
  ["01.03", "Serviços Eng./Obras Civis", "Renomear + reclassificar", "Obras de implantação dos PEVs", "44.90.51", "Memorial + ART + SINAPI"],
  ["01.03", "Consultorias", "Renomear", "Projetos de engenharia dos PEVs", "33.90.39", "Produtos"],
  ["01.03", "Placas e sinalização", "Avaliar absorver", "Placas de sinalização dos PEVs", "33.90.30", "DECISÃO"],
  ["01.03", "Containers e equipamentos", "Desmembrar", "Container metálico; tambor coletor; etc.", "44.90.52", "Lista + nº por PEV"],
  ["01.04", "Consultorias", "Renomear", "Treinamento de operadores dos PEVs", "33.90.39", "Produtos"],
  ["01.04", "Materiais didáticos", "Detalhar", "Apostilas de treinamento PEV", "33.90.30", "Quantidades"],
  ["01.04", "Estrutura para oficinas", "Detalhar", "Estrutura para oficinas", "33.90.39", "Composição"],
  ["01.05", "Veículos (caminhão)", "Renomear + especificar", "Caminhão coletor compactador ou baú", "44.90.52", "Tipo exato"],
  ["01.05", "Veículos (pick-up)", "Renomear + especificar", "Pick-up cabine dupla 4x4 diesel", "44.90.52", "Modelo de referência"],
  ["01.05", "Veículos (carrinho de carga)", "Renomear", "Carrinho plataforma galvanizado 350kg", "44.90.52", "Especificações"],
  ["01.05", "Veículos (carrinho 700L)", "Renomear + corrigir unidade", "Container de coleta seletiva 700L", "44.90.52", "Quantidade"],
  ["01.05", "Veículos (carrinho elétrico)", "Renomear", "Carrinho elétrico de coleta seletiva", "44.90.52", "Especificações"],
  ["01.05", "EPIs", "Renomear + detalhar", "EPIs coleta seletiva", "33.90.30", "Nº colaboradores"],
  ["01.05", "Combustível", "Excluir recomendado", "-", "-", "DECISÃO"],
  ["01.05", "Manutenção", "Excluir recomendado", "-", "-", "DECISÃO"],
  ["01.05", "Equipe operacional", "Excluir ou justificar", "Equipe de coleta, se mantida", "33.90.36 ou 33.90.39", "DECISÃO + composição"],
  ["01.06", "Consultorias", "Renomear", "Acompanhamento da logística e mobilização", "33.90.39", "Produtos"],
  ["01.06", "Diárias", "Absorver na consultoria", "-", "-", "-"],
  ["01.07", "Publicidade e marketing", "Renomear", "Materiais gráficos/digitais", "33.90.39", "Nº peças"],
  ["01.07", "Impulsionamento online", "Avaliar suprimir", "-", "-", "DECISÃO"],
  ["01.07", "Impressão de materiais", "Detalhar", "Folders A5, cartazes A3, banners", "33.90.30", "Quantidades"],
  ["01.08", "Consultorias", "Renomear", "Canal de denúncias e SIGRS", "33.90.39", "Produtos"],
  ["01.08", "Materiais permanentes", "Decidir aluguel vs aquisição", "Equipamentos de informática", "44.90.52 ou 33.90.39", "DECISÃO + especificação"],
  ["01.08", "Suporte técnico", "Ajustar", "Suporte técnico SIGRS", "33.90.39", "-"],
  ["01.09", "Consultorias", "Renomear", "Relatório de Cumprimento de Objeto Final", "33.90.39", "Produtos"],
  ["02.01", "Consultorias", "Renomear", "Projetos de engenharia da UTC", "33.90.39", "Produtos"],
  ["02.02", "Consultorias", "Renomear", "Reestruturação dos processos internos da UTC", "33.90.39", "Nº oficinas"],
  ["02.02", "Materiais gráficos", "Avaliar suprimir", "-", "-", "DECISÃO"],
  ["02.02", "Reuniões técnicas", "Excluir", "-", "-", "-"],
  ["02.03", "Obras e Serviços de Engenharia", "Renomear", "Obras de reestruturação da UTC", "44.90.51", "Memorial + ART"],
  ["02.03", "Materiais de consumo", "Realocar em obras", "-", "-", "-"],
  ["02.03", "Serviços Complementares", "Realocar em obras", "-", "-", "-"],
  ["02.04", "Equipamentos permanentes", "Desmembrar", "Esteira, prensa, balança, etc.", "44.90.52", "Lista + especificações"],
  ["02.04", "Tambor de óleo", "Reclassificar", "Tambor armazenamento óleo 200L", "33.90.30", "-"],
  ["02.04", "Móveis e materiais permanentes", "Desmembrar parcialmente", "Mobiliário + eletro + utensílios", "44.90.52 / 33.90.30", "Quantidades"],
  ["02.04", "Serviços de instalação", "Avaliar absorver", "-", "-", "DECISÃO"],
  ["02.05", "Consultoria especializada", "Renomear", "Treinamento da equipe da UTC", "33.90.39", "Nº oficinas"],
  ["02.06", "Equipamentos individuais (EPIs)", "Renomear + ajustar", "EPIs UTC", "33.90.30", "Nº colaboradores UTC"],
  ["02.06", "Despesas operacionais", "Excluir recomendado", "-", "-", "DECISÃO"],
  ["02.06", "Consultor PF - segurança", "Renomear", "Supervisão da Segurança do Trabalho", "33.90.36", "Atividades"],
  ["02.06", "Consultor PF - qualidade", "Renomear", "Supervisão da Qualidade Ambiental", "33.90.36", "Atividades"],
  ["03.01", "Consultorias", "Renomear", "Projetos para pátio de compostagem", "33.90.39", "Produtos"],
  ["03.02", "Consultorias", "Renomear", "Plano Operacional de Compostagem", "33.90.39", "Produtos"],
  ["03.03", "Serviços de engenharia", "Renomear", "Obras do pátio de compostagem", "44.90.51", "Memorial + ART"],
  ["03.04", "Consultorias", "Renomear", "Capacitação em compostagem", "33.90.39", "Atividades"],
  ["03.05", "Materiais de consumo", "Desmembrar profundamente", "Sacos, EPIs, etiquetas, composteiras, ferramentas", "33.90.30", "Quantitativos"],
  ["03.05", "Termômetro de compostagem", "Criar equipamento", "Termômetro de compostagem", "44.90.52", "Modelo"],
  ["03.05", "Medidor de umidade", "Criar equipamento", "Medidor de umidade de compostagem", "44.90.52", "Modelo"],
  ["03.05", "Balança de pátio", "Criar equipamento", "Balança de pátio", "44.90.52", "Capacidade"],
  ["03.05", "Transporte", "Excluir recomendado", "-", "-", "DECISÃO"],
  ["03.05", "Despesas operacionais", "Desmembrar ou excluir", "-", "-", "DECISÃO"],
  ["03.06", "Equipe de apoio", "Renomear", "Implantação de hortas comunitárias", "33.90.39", "Nº hortas"],
  ["03.06", "Mudas e insumos", "Detalhar", "Mudas + insumos orgânicos", "33.90.30", "Especificações agronômicas"],
  ["03.06", "Ferramentas e materiais permanentes", "Desmembrar", "Ferramentas agrícolas + materiais permanentes", "33.90.30 / 44.90.52", "Especificações"],
  ["04.01", "Consultorias", "Renomear", "Regulamento e procedimentos PSA", "33.90.39", "Produtos"],
  ["04.02", "Consultorias", "Renomear", "Mapeamento de catadores autônomos", "33.90.39", "Produtos"],
  ["04.02", "Transporte", "Excluir", "-", "-", "-"],
  ["04.03", "Consultorias", "Renomear", "Capacitação dos catadores", "33.90.39", "Atividades"],
  ["04.03", "Estrutura de apoio", "Renomear", "Alimentação nas capacitações", "33.90.30", "Composição"],
  ["04.03", "Materiais pedagógicos", "Detalhar", "Cartilha, folder, caderno", "33.90.30", "Quantidades"],
  ["04.04", "Pagamento PSA", "Detalhar + majorar valor", "Pagamento dos serviços via PSA", "33.90.36 ou 33.90.48", "Nº catadores + valor + critério"],
  ["04.04", "Materiais de Consumo", "Avaliar suprimir", "-", "-", "DECISÃO"]
];

const expenses = expensesRaw.map(([stage, item, action, finalItem, nature, gap], index) => ({
  id: `F-${String(index + 1).padStart(2, "0")}`,
  part: parts[3],
  title: `${stage} - ${item}`,
  meta: { "Etapa": stage, "Item atual": item, "Item final proposto": finalItem, "Natureza": nature, "Lacuna": gap },
  groups: [
    { key: "recommendation", label: "Tratamento", choices: actionChoices(action) },
    { key: "nature", label: "Natureza de despesa", choices: ["33.90.30", "33.90.36", "33.90.39", "33.90.48", "44.90.51", "44.90.52", "Não se aplica"] },
    { key: "quotes", label: "Cotações", choices: ["Cotação 1 obtida", "Cotação 2 obtida", "Cotação 3 obtida", "Pesquisa oficial", "Pendente"] }
  ],
  numbers: [{ key: "quantity", label: "Quantidade" }, { key: "unitValue", label: "Valor unitário estimado" }],
  fields: ["Especificação escolhida", "Justificativa / observação"]
}));

const finance = [
  ["G-01", "Combustível", "01.05", "246.807,90", ["Excluir e remanejar", "Manter com justificativa", "Remanejar parcialmente"]],
  ["G-02", "Manutenção", "01.05", "47.100,00", ["Excluir e remanejar", "Manter com justificativa", "Remanejar parcialmente"]],
  ["G-03", "Equipe operacional", "01.05", "1.246.426,50", ["Excluir", "Manter com justificativa", "Reduzir e remanejar"]],
  ["G-04", "Despesas operacionais", "02.06", "26.400,00", ["Excluir e remanejar", "Manter com justificativa"]],
  ["G-05", "Transporte", "03.05", "9.000,00", ["Excluir e remanejar", "Manter com justificativa"]],
  ["G-06", "Despesas operacionais", "03.05", "63.151,20", ["Desmembrar", "Excluir", "Manter com justificativa"]],
  ["G-07", "Transporte", "04.02", "1.050,00", ["Excluir e absorver", "Manter com justificativa"]],
  ["G-08", "Reuniões técnicas", "02.02", "2.000,00", ["Excluir e absorver", "Manter com justificativa"]],
  ["G-09", "Materiais de consumo", "02.03", "72.510,32", ["Realocar em obras", "Manter separado"]],
  ["G-10", "Serviços Complementares", "02.03", "114.748,49", ["Realocar em obras", "Manter separado"]]
].map(([id, title, stage, value, choices]) => ({
  id,
  part: parts[4],
  title,
  meta: { "Etapa": stage, "Valor atual (R$)": value },
  groups: [
    { key: "financialDecision", label: "Decisão financeira", choices },
    { key: "destination", label: "Destino do remanejamento", choices: ["PSA", "Equipamentos UTC", "Composteiras e hortas", "Obras PEVs", "Obras UTC", "A definir"] }
  ],
  numbers: [{ key: "remapValue", label: "Valor a remanejar (R$)" }],
  fields: ["Justificativa"]
}));

const decisions = [
  ["D-01", "Estrutura atual de gestão de resíduos", ["Catadores quantificados", "Autônomos/formalizados definidos", "Cooperativas identificadas", "Contratos vigentes levantados", "Coleta atual mapeada", "Lixões identificados"]],
  ["D-02", "PEVs", ["Quantidade por município", "Modelo físico", "Tipos de resíduos recebidos", "Operador fixo", "Energia/drenagem/balança/câmeras", "Endereços"]],
  ["D-03", "UTC", ["Capacidade atual", "Capacidade projetada", "Toneladas processadas hoje", "Trabalhadores e vínculo", "Licença ambiental", "Comercialização formal", "Lista de equipamentos", "Nº de EPIs"]],
  ["D-04", "Compostagem", ["Volume de orgânicos", "Origem dos orgânicos", "Método", "Capacidade do pátio", "Composteiras domésticas", "Hortas comunitárias"]],
  ["D-05", "PSA", ["Nº de catadores", "Critério de pagamento", "Valor mensal", "Forma de aferição", "Sustentabilidade pós-projeto", "Abrangência autônomos/cooperados"]],
  ["D-06", "Mobilização e educação ambiental", ["Escolas por município", "Oficinas por meta", "Participantes por oficina", "Equipe fixa ou consultoria", "Plano de Mobilização"]],
  ["D-07", "SIGRS", ["Adaptar sistema existente", "Desenvolver do zero", "SaaS", "Módulos definidos", "Operação definida", "Aluguel vs aquisição de computadores"]],
  ["D-08", "Especificações técnicas", ["Caminhão", "Pick-up", "Carrinho elétrico", "Containers", "Notebook/impressora"]]
].map(([id, title, choices]) => ({
  id,
  part: parts[5],
  title,
  meta: { "Bloco": title },
  groups: [
    { key: "checklist", label: "Campos possíveis", choices },
    { key: "state", label: "Situação", choices: ["Completo", "Parcial", "Pendente CONDAPAV", "Pendente consultor", "Não se aplica"] }
  ],
  fields: ["Responsável", "Prazo", "Observação"]
}));

const fields = [...architecture, ...indicators, ...stages, ...expenses, ...finance, ...decisions];
let state = loadState();
let activePart = "";

const consolidatedDefaults = {
  ...buildExpenseDefaults(),

  "A-01": defaultRecord("respondido", ["executor:CONDAPAV", "funding:Rateio", "funding:Receita reciclagem", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV",
    prazo: "01/05/2026 a 31/05/2028",
    justificativa_observacao: "Coleta seletiva de secos executada pelo CONDAPAV em rota intermunicipal de 167 km ate a UTC de Cristiano Otoni."
  }),
  "A-02": defaultRecord("respondido", ["executor:Prefeitura", "funding:Prefeitura", "decision:Confirmado"], {}, {
    responsavel: "Seis prefeituras consorciadas",
    prazo: "01/05/2026 a 31/05/2028",
    justificativa_observacao: "Coleta de organicos executada pelas prefeituras, mediante Termo de Parceria, com destinacao ao patio de compostagem da UTC."
  }),
  "A-03": defaultRecord("respondido", ["executor:Servidores municipais", "executor:Sem operador", "funding:Município", "decision:Confirmado"], {}, {
    responsavel: "Prefeituras consorciadas, com coordenacao do CONDAPAV",
    prazo: "16/03/2026 a 15/01/2027",
    justificativa_observacao: "PEVs operados em modelo hibrido, com ou sem operador fixo, conforme definicao de cada municipio no Plano Logistico."
  }),
  "A-04": defaultRecord("respondido", ["executor:Operador fixo", "executor:Câmera", "funding:Município", "decision:Confirmado"], {}, {
    responsavel: "Prefeituras consorciadas",
    prazo: "Apos implantacao dos PEVs",
    justificativa_observacao: "Controle de entrada definido conforme projeto de cada PEV, podendo combinar operador, camera e rotina municipal."
  }),
  "A-05": defaultRecord("respondido", ["executor:Servidores efetivos", "funding:Consórcio", "funding:Receita venda recicláveis", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV",
    prazo: "01/05/2026 a 31/05/2028",
    justificativa_observacao: "UTC operada pelo CONDAPAV com 18 colaboradores CLT; Meta 2 restrita a triagem e beneficiamento de reciclaveis secos."
  }),
  "A-06": defaultRecord("respondido", ["executor:Equipe própria UTC", "funding:Consórcio", "funding:Receita venda composto", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV",
    prazo: "Apos readequacao do patio de compostagem",
    justificativa_observacao: "Operacao vinculada ao Plano Operacional de Compostagem, com aproveitamento do composto produzido."
  }),
  "A-07": defaultRecord("respondido", ["executor:Consultoria contratada", "executor:Mobilizadores locais", "executor:Escolas", "funding:Município", "funding:Consórcio", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV, consultoria contratada e prefeituras",
    prazo: "Durante as Metas 1, 3 e 4",
    justificativa_observacao: "Mobilizacao social, campanhas, oficinas, hortas escolares e educacao ambiental integradas ao plano de trabalho."
  }),
  "A-08": defaultRecord("respondido", ["executor:Empresa contratada", "funding:Consórcio - licença/manutenção", "decision:Confirmado"], {}, {
    responsavel: "Empresa contratada + CONDAPAV",
    prazo: "01/01/2028 a 30/04/2028",
    justificativa_observacao: "Desenvolvimento e implantacao do SIGRS e Canal do Cidadao com 8 modulos, 8 funcionalidades e integracao dos 6 municipios."
  }),
  "A-09": defaultRecord("respondido", ["executor:Equipe interna", "executor:Suporte do fornecedor", "funding:Consórcio", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV + fornecedor do SIGRS",
    prazo: "10 meses de suporte tecnico previstos",
    justificativa_observacao: "Suporte tecnico ao SIGRS previsto como servico mensal, com operacao continuada pela equipe do consorcio."
  }),
  "A-10": defaultRecord("respondido", ["executor:Consultoria", "executor:Escolas", "funding:Município", "decision:Confirmado"], {}, {
    responsavel: "Consultoria contratada, escolas e prefeituras",
    prazo: "Meta 3, Etapa 03.06",
    justificativa_observacao: "Implantacao de 6 hortas escolares e atividades de educacao ambiental, incluindo oficinas, registros e relatorios."
  }),
  "A-11": defaultRecord("respondido", ["executor:Consórcio - conta vinculada", "funding:Definir fonte permanente", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV",
    prazo: "Meta 4, Etapa 04.04",
    justificativa_observacao: "PSA majorado para 10% do valor global, com 12 catadores por 12 meses e pagamento mensal por servicos ambientais."
  }),
  "A-12": defaultRecord("respondido", ["executor:Município", "executor:Consórcio", "executor:Não previsto no projeto - auto-sustentação", "funding:Confirmação obrigatória de fonte", "decision:Confirmado"], {}, {
    responsavel: "CONDAPAV e prefeituras consorciadas",
    prazo: "Pos-projeto e operacao continuada",
    justificativa_observacao: "Combustivel, manutencao, energia e despesas operacionais genericas foram excluidos ou absorvidos por auto-sustentacao."
  }),

  "C-01": indicatorDefault("90", "CONDAPAV", "Meta ao fim da implantacao: 90 t/mes de reciclaveis secos coletados."),
  "C-02": indicatorDefault("120", "Prefeituras consorciadas", "Meta: 120 t/mes de organicos coletados e enviados a UTC."),
  "C-03": indicatorDefault("", "CONDAPAV", "Afericao pela pesagem de saida do patio de compostagem."),
  "C-04": indicatorDefault("6", "CONDAPAV", "Seis municipios consorciados atendidos."),
  "C-05": indicatorDefault("6", "CONDAPAV", "Minimo de 1 PEV por municipio."),
  "C-06": indicatorDefault("6", "Consultoria contratada", "Uma horta escolar por municipio."),
  "C-07": indicatorDefault("6", "Consultoria contratada + escolas", "Atendimento escolar vinculado a implantacao das hortas e educacao ambiental."),
  "C-08": indicatorDefault("30", "Consultoria contratada", "Composteiras domesticas previstas no orcamento consolidado."),
  "C-09": indicatorDefault("6", "Consultoria contratada", "Operadores de PEV capacitados, 1 por municipio."),
  "C-10": indicatorDefault("6", "Consultoria contratada", "Mobilizadores municipais capacitados, 1 por municipio."),
  "C-11": indicatorDefault("12", "Consultoria contratada", "Catadores previstos para o PSA."),
  "C-12": indicatorDefault("", "Consultoria contratada", "Oficinas previstas nas etapas de mobilizacao, PEV, compostagem e PSA."),
  "C-13": indicatorDefault("12", "CONDAPAV", "12 catadores autonomos aderidos ao PSA."),
  "C-14": indicatorDefault("", "CONDAPAV", "Afericao por recibo/pesagem no regulamento do PSA."),
  "C-15": indicatorDefault("2", "Consultorias contratadas", "Diagnostico da coleta seletiva e mapeamento/cadastramento de catadores."),
  "C-16": indicatorDefault("4", "Consultorias contratadas", "Plano Diretor, Plano Logistico, Plano de Mobilizacao e Plano Operacional de Compostagem."),
  "C-17": indicatorDefault("3", "Consultorias contratadas", "Projetos executivos dos PEVs, UTC e patio de compostagem."),
  "C-18": indicatorDefault("1", "CONDAPAV", "Regulamento do Programa PSA."),
  "C-19": indicatorDefault("", "CONDAPAV", "Relatorios tecnicos por etapa e relatorio final de cumprimento do objeto."),
  "C-20": indicatorDefault("3", "CONDAPAV", "Obras dos PEVs, UTC e patio de compostagem."),
  "C-21": indicatorDefault("8", "Empresa contratada", "SIGRS com 8 modulos."),
  "C-22": indicatorDefault("1", "Empresa contratada", "Canal do Cidadao publico integrado ao SIGRS."),
  "C-23": indicatorDefault("", "Consultoria contratada", "Campanha integrada com pecas graficas/digitais e videos."),
  "C-24": indicatorDefault("", "Consultoria contratada", "Videos institucionais previstos na campanha de comunicacao ambiental."),

  "E-01.01": stageDefault(["1", "1", "1"], "Sedes municipais, zonas rurais e sede do CONDAPAV", "CONDAPAV + PJ especializada", "01/12/2025 a 15/03/2026"),
  "E-01.02": stageDefault(["1", "6", "1"], "Seis municipios e sede do CONDAPAV", "CONDAPAV + PJ especializada", "01/02/2026 a 30/04/2026"),
  "E-01.03": stageDefault(["6", "1"], "Seis municipios consorciados", "CONDAPAV + PJ de engenharia", "16/03/2026 a 15/01/2027"),
  "E-01.04": stageDefault(["6", "6"], "PEVs e bairros do entorno nos 6 municipios", "CONDAPAV + PJ especializada", "01/12/2026 a 01/04/2027"),
  "E-01.05": stageDefault(["90", "120", "6"], "Rota intermunicipal de 167 km ate a UTC", "CONDAPAV e prefeituras consorciadas", "01/05/2026 a 31/05/2028"),
  "E-01.06": stageDefault(["", "1", "1"], "Seis municipios, com consolidacao na sede do CONDAPAV", "CONDAPAV + PJ especializada", "01/04/2027 a 01/06/2027"),
  "E-01.07": stageDefault(["", "", ""], "Meios fisicos e digitais oficiais dos 6 municipios", "CONDAPAV + PJ especializada", "01/07/2027 a 31/08/2027"),
  "E-01.08": stageDefault(["1", "8"], "CONDAPAV e integracao dos 6 municipios", "Empresa contratada + CONDAPAV", "01/01/2028 a 30/04/2028"),
  "E-01.09": stageDefault(["1"], "Sede do CONDAPAV", "CONDAPAV + PJ especializada", "01/05/2028 a 31/05/2028"),
  "E-02.01": stageDefault(["1", "1"], "UTC em Cristiano Otoni/MG", "CONDAPAV + PJ de engenharia", "Meta 2"),
  "E-02.02": stageDefault(["1", ""], "UTC em Cristiano Otoni/MG", "CONDAPAV + PJ especializada", "Meta 2"),
  "E-02.03": stageDefault(["1", ""], "UTC em Cristiano Otoni/MG", "CONDAPAV + empresa de engenharia", "Meta 2"),
  "E-02.04": stageDefault([""], "UTC em Cristiano Otoni/MG", "CONDAPAV", "Meta 2"),
  "E-02.05": stageDefault(["18", ""], "UTC em Cristiano Otoni/MG", "CONDAPAV + PJ especializada", "Meta 2"),
  "E-02.06": stageDefault(["", ""], "UTC em Cristiano Otoni/MG", "CONDAPAV", "Meta 2"),
  "E-03.01": stageDefault(["1", "1", "1"], "Patio de compostagem da UTC", "CONDAPAV + PJ de engenharia", "Meta 3"),
  "E-03.02": stageDefault(["1"], "Patio de compostagem da UTC", "CONDAPAV + PJ especializada", "Meta 3"),
  "E-03.03": stageDefault(["1", ""], "Patio de compostagem da UTC", "CONDAPAV + empresa de engenharia", "Meta 3"),
  "E-03.04": stageDefault(["4", "12"], "UTC e municipios consorciados", "CONDAPAV + PJ especializada", "Meta 3"),
  "E-03.05": stageDefault(["120", "", "30"], "Patio de compostagem da UTC e domicilios atendidos", "CONDAPAV + PJ especializada", "Meta 3"),
  "E-03.06": stageDefault(["6", "6", "6"], "Escolas dos seis municipios", "CONDAPAV + PJ especializada + escolas", "Meta 3"),
  "E-04.01": stageDefault(["1"], "Sede do CONDAPAV", "CONDAPAV + PJ especializada", "Meta 4"),
  "E-04.02": stageDefault(["12", "12"], "Seis municipios consorciados", "CONDAPAV + PJ especializada", "Meta 4"),
  "E-04.03": stageDefault(["12", "12", "6"], "Seis municipios consorciados", "CONDAPAV + PJ especializada", "Meta 4"),
  "E-04.04": stageDefault(["12", "", "12"], "Seis municipios consorciados", "CONDAPAV", "Meta 4"),

  "G-01": financeDefault("Excluir e remanejar", "Obras PEVs", "246807.90", "Excluido da Etapa 01.05 por auto-sustentacao do consorcio."),
  "G-02": financeDefault("Excluir e remanejar", "Obras PEVs", "47100.00", "Excluido da Etapa 01.05 por auto-sustentacao do consorcio."),
  "G-03": financeDefault("Excluir", "A definir", "1246426.50", "Equipe operacional integral excluida; operacao por equipe permanente e prefeituras."),
  "G-04": financeDefault("Excluir e remanejar", "A definir", "26400.00", "Despesas operacionais da UTC excluidas/auto-sustentacao."),
  "G-05": financeDefault("Excluir e remanejar", "Composteiras e hortas", "9000.00", "Transporte da compostagem excluido por auto-sustentacao."),
  "G-06": financeDefault("Desmembrar", "Composteiras e hortas", "63151.20", "Despesas genericas substituidas por itens individualizados de compostagem."),
  "G-07": financeDefault("Excluir e absorver", "PSA", "1050.00", "Transporte absorvido no Produto 22."),
  "G-08": financeDefault("Excluir e absorver", "Equipamentos UTC", "2000.00", "Reunioes tecnicas absorvidas no Produto 10."),
  "G-09": financeDefault("Realocar em obras", "Obras UTC", "72510.32", "Materiais de consumo embutidos nas obras da UTC."),
  "G-10": financeDefault("Realocar em obras", "Obras UTC", "114748.49", "Servicos complementares embutidos nas obras da UTC."),

  "D-01": decisionDefault(["Coleta atual mapeada", "Catadores quantificados"], "Parcial", "Linha-base: 100 t/mes de mistos na UTC, 15 t/mes segregadas, gravimetria com 30% de reciclaveis. Catadores do PSA: 12 previstos."),
  "D-02": decisionDefault(["Quantidade por município", "Modelo físico", "Tipos de resíduos recebidos", "Operador fixo"], "Parcial", "6 PEVs, minimo 1 por municipio; detalhes fisicos e enderecos dependem do Plano Logistico/projetos."),
  "D-03": decisionDefault(["Trabalhadores e vínculo", "Lista de equipamentos", "Nº de EPIs"], "Parcial", "UTC em Cristiano Otoni com 18 colaboradores CLT; equipamentos e EPIs individualizados no plano."),
  "D-04": decisionDefault(["Volume de orgânicos", "Origem dos orgânicos", "Composteiras domésticas", "Hortas comunitárias"], "Parcial", "Meta de 120 t/mes de organicos, 30 composteiras domesticas e 6 hortas escolares."),
  "D-05": decisionDefault(["Nº de catadores", "Critério de pagamento", "Valor mensal", "Forma de aferição", "Sustentabilidade pós-projeto"], "Completo", "PSA: 12 catadores x R$ 5.000/mes x 12 meses no plano de trabalho; orcamento detalhado ainda registra R$ 4.800/mes."),
  "D-06": decisionDefault(["Escolas por município", "Oficinas por meta", "Participantes por oficina", "Plano de Mobilização"], "Parcial", "6 mobilizadores, 6 hortas escolares e acoes de educacao ambiental integradas."),
  "D-07": decisionDefault(["Desenvolver do zero", "Módulos definidos", "Operação definida", "Aluguel vs aquisição de computadores"], "Completo", "SIGRS desenvolvido por empresa contratada, com 8 modulos, Canal do Cidadao, equipamentos de TIC e suporte tecnico."),
  "D-08": decisionDefault(["Caminhão", "Pick-up", "Containers", "Notebook/impressora"], "Parcial", "Caminhao bau 6 t, pick-up, containers, notebooks/impressoras definidos; frota de compactadores municipais segue como item-chave a validar.")
};

function unique(value, index, array) {
  return array.indexOf(value) === index;
}

function defaultRecord(status, checkedGroups = [], numbers = {}, textFields = {}) {
  return {
    status,
    groups: checkedGroups.reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {}),
    numbers,
    fields: textFields
  };
}

function indicatorDefault(target, responsible, note) {
  return defaultRecord("respondido", ["use:Usar"], target ? { target } : {}, {
    responsavel: responsible,
    observacao: note
  });
}

function stageDefault(values, location, responsible, period) {
  const numbers = values.reduce((acc, value, index) => {
    if (value !== "") acc[`q${index + 1}`] = value;
    return acc;
  }, {});
  return defaultRecord("respondido", ["validated:Manter"], numbers, {
    municipio_local: location,
    responsavel: responsible,
    observacao: `Autopreenchido a partir do Plano de Trabalho consolidado. Periodo/referencia: ${period}.`
  });
}

function financeDefault(decision, destination, value, note) {
  return defaultRecord("respondido", [`financialDecision:${decision}`, `destination:${destination}`], { remapValue: value }, {
    justificativa: note
  });
}

function decisionDefault(items, stateValue, note) {
  return defaultRecord("respondido", [...items.map((item) => `checklist:${item}`), `state:${stateValue}`], {}, {
    responsavel: "CONDAPAV",
    prazo: "Conforme cronograma do Plano de Trabalho readequado",
    observacao: note
  });
}

function buildExpenseDefaults() {
  return expenses.reduce((acc, expense) => {
    const item = expense.meta["Item final proposto"];
    const nature = expense.meta["Natureza"];
    const gap = expense.meta["Lacuna"];
    const action = expense.groups[0].choices[0];
    const excluded = item === "-" || /excluir|suprimir/i.test(action);
    const groups = [`recommendation:${action}`];

    if (nature && nature !== "-" && !nature.includes(" ou ") && !nature.includes("/")) {
      groups.push(`nature:${nature}`);
    }
    if (!excluded && gap !== "DECISÃO") {
      groups.push("quotes:Pendente");
    }

    acc[expense.id] = defaultRecord(excluded ? "nao_aplica" : "respondido", groups, {}, {
      especificacao_escolhida: item === "-" ? "Item excluido/absorvido conforme plano consolidado." : item,
      justificativa_observacao: buildExpenseNote(expense, excluded)
    });
    return acc;
  }, {});
}

function buildExpenseNote(expense, excluded) {
  const stage = expense.meta["Etapa"];
  const nature = expense.meta["Natureza"];
  const gap = expense.meta["Lacuna"];
  const base = excluded
    ? "Tratamento consolidado: excluir, absorver ou remanejar o item para evitar despesa operacional generica."
    : "Tratamento consolidado no plano de trabalho: manter como item especificado ou produto contratado.";
  return `${base} Etapa ${stage}. Natureza sugerida: ${nature}. Ponto de controle: ${gap}.`;
}

function applyConsolidatedDefaults({ overwrite = false } = {}) {
  Object.entries(consolidatedDefaults).forEach(([id, defaults]) => {
    const record = getRecord(id);
    if (overwrite || !record.status || record.status === "pendente") {
      record.status = defaults.status || record.status || "pendente";
    }

    ["groups", "numbers", "fields"].forEach((bucket) => {
      record[bucket] = record[bucket] || {};
      Object.entries(defaults[bucket] || {}).forEach(([key, value]) => {
        if (overwrite || record[bucket][key] === undefined || record[bucket][key] === "") {
          record[bucket][key] = value;
        }
      });
    });
  });
  saveState();
}

function actionChoices(action) {
  const base = ["Aceitar recomendação", "Revisar", "Manter com justificativa", "Não se aplica"];
  const normalized = action.split("+").map((item) => item.trim()).filter(Boolean);
  return [...normalized, ...base].filter(unique);
}

function loadState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateSummary();
}

function getRecord(id) {
  if (!state[id]) state[id] = { status: "pendente", groups: {}, fields: {}, numbers: {} };
  return state[id];
}

function cleanText(text) {
  return String(text || "").replace(/\*\*/g, "").trim();
}

function render() {
  renderFilters();
  renderTabs();
  const root = document.getElementById("formRoot");
  root.innerHTML = "";

  parts.forEach((part) => {
    const section = document.createElement("section");
    section.className = "part-section";
    section.dataset.part = part;

    const title = document.createElement("h2");
    title.className = "part-title";
    title.textContent = part;
    section.appendChild(title);

    fields.filter((field) => field.part === part).forEach((field) => {
      section.appendChild(renderField(field));
    });

    root.appendChild(section);
  });

  applyFilters();
  updateSummary();
}

function renderFilters() {
  const select = document.getElementById("partFilter");
  select.innerHTML = '<option value="">Todas</option>' + parts.map((part) => `<option value="${part}">${part}</option>`).join("");
}

function renderTabs() {
  const tabs = document.getElementById("tabs");
  tabs.innerHTML = "";
  const all = document.createElement("button");
  all.type = "button";
  all.textContent = "Todas";
  all.className = activePart ? "" : "active";
  all.addEventListener("click", () => setPart(""));
  tabs.appendChild(all);

  parts.forEach((part) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = part;
    button.className = activePart === part ? "active" : "";
    button.addEventListener("click", () => setPart(part));
    tabs.appendChild(button);
  });
}

function setPart(part) {
  activePart = part;
  document.getElementById("partFilter").value = part;
  renderTabs();
  applyFilters();
}

function renderField(field) {
  const template = document.getElementById("fieldTemplate");
  const node = template.content.firstElementChild.cloneNode(true);
  const record = getRecord(field.id);
  node.dataset.id = field.id;
  node.dataset.part = field.part;
  node.dataset.search = JSON.stringify(field).toLowerCase();

  node.querySelector(".field-part").textContent = `${field.part} | ${field.id}`;
  node.querySelector("h2").textContent = cleanText(field.title);

  const status = node.querySelector(".status-input");
  status.value = record.status || "pendente";
  status.addEventListener("change", () => {
    record.status = status.value;
    saveState();
    applyFilters();
  });

  const metadata = node.querySelector(".metadata");
  Object.entries(field.meta || {}).forEach(([key, value]) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `<dt>${key}</dt><dd>${cleanText(value)}</dd>`;
    metadata.appendChild(wrapper);
  });

  const groups = node.querySelector(".choice-groups");
  (field.groups || []).forEach((group) => groups.appendChild(renderChoiceGroup(field, group, record)));

  const free = node.querySelector(".free-fields");
  (field.numbers || []).forEach((number) => free.appendChild(renderNumber(field, number, record)));
  (field.fields || []).forEach((label) => free.appendChild(renderTextArea(field, label, record)));

  return node;
}

function renderChoiceGroup(field, group, record) {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "choice-group";
  const legend = document.createElement("legend");
  legend.textContent = group.label;
  fieldset.appendChild(legend);

  group.choices.forEach((choice) => {
    const key = `${group.key}:${choice}`;
    const label = document.createElement("label");
    label.className = "choice";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = Boolean(record.groups[key]);
    input.addEventListener("change", () => {
      record.groups[key] = input.checked;
      if (input.checked && record.status === "pendente") record.status = "em_analise";
      saveState();
      render();
    });
    label.appendChild(input);
    label.appendChild(document.createTextNode(cleanText(choice)));
    fieldset.appendChild(label);
  });

  return fieldset;
}

function renderNumber(field, number, record) {
  const label = document.createElement("label");
  label.textContent = number.label;
  const input = document.createElement("input");
  input.className = "small-input";
  input.type = "number";
  input.step = "any";
  input.value = record.numbers[number.key] || "";
  input.addEventListener("input", () => {
    record.numbers[number.key] = input.value;
    saveState();
  });
  label.appendChild(input);
  return label;
}

function renderTextArea(field, labelText, record) {
  const key = slug(labelText);
  const label = document.createElement("label");
  label.textContent = labelText;
  const textarea = document.createElement("textarea");
  textarea.value = record.fields[key] || "";
  textarea.addEventListener("input", () => {
    record.fields[key] = textarea.value;
    saveState();
  });
  label.appendChild(textarea);
  return label;
}

function slug(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function applyFilters() {
  const query = document.getElementById("search").value.toLowerCase().trim();
  const part = activePart || document.getElementById("partFilter").value;
  const status = document.getElementById("statusFilter").value;

  document.querySelectorAll(".part-section").forEach((section) => {
    let visibleCount = 0;
    section.querySelectorAll(".field-card").forEach((card) => {
      const record = getRecord(card.dataset.id);
      const visible = (!part || card.dataset.part === part)
        && (!status || record.status === status)
        && (!query || card.dataset.search.includes(query));
      card.classList.toggle("hidden", !visible);
      if (visible) visibleCount += 1;
    });
    section.classList.toggle("hidden", visibleCount === 0);
  });
}

function updateSummary() {
  const total = fields.length;
  const records = fields.map((field) => getRecord(field.id));
  const answered = records.filter((record) => record.status === "respondido").length;
  const pending = records.filter((record) => record.status === "pendente").length;
  const na = records.filter((record) => record.status === "nao_aplica").length;
  document.getElementById("countTotal").textContent = total;
  document.getElementById("countAnswered").textContent = answered;
  document.getElementById("countPending").textContent = pending;
  document.getElementById("countNa").textContent = na;
}

function exportCsv() {
  const header = ["id", "parte", "titulo", "status", "campo", "valor"];
  const rows = [header];

  fields.forEach((field) => {
    const record = getRecord(field.id);
    rows.push([field.id, field.part, field.title, record.status, "metadados", JSON.stringify(field.meta || {})]);
    Object.entries(record.groups || {}).filter(([, checked]) => checked).forEach(([key]) => {
      rows.push([field.id, field.part, field.title, record.status, key.split(":")[0], key.split(":").slice(1).join(":")]);
    });
    Object.entries(record.numbers || {}).forEach(([key, value]) => rows.push([field.id, field.part, field.title, record.status, key, value]));
    Object.entries(record.fields || {}).forEach(([key, value]) => rows.push([field.id, field.part, field.title, record.status, key, value]));
  });

  download("matriz_condapav_respostas.csv", rows.map((row) => row.map(csvCell).join(";")).join("\n"), "text/csv;charset=utf-8");
}

function csvCell(value) {
  return `"${String(value ?? "").replace(/"/g, '""')}"`;
}

function exportJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    source: "01_MATRIZ_Exigencia_x_Resposta.md",
    state
  };
  download("matriz_condapav_respostas.json", JSON.stringify(payload, null, 2), "application/json");
}

function download(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const payload = JSON.parse(reader.result);
      state = payload.state || payload;
      applyConsolidatedDefaults();
      saveState();
      render();
    } catch {
      alert("Arquivo JSON inválido.");
    }
  };
  reader.readAsText(file);
}

document.getElementById("search").addEventListener("input", applyFilters);
document.getElementById("partFilter").addEventListener("change", (event) => setPart(event.target.value));
document.getElementById("statusFilter").addEventListener("change", applyFilters);
document.getElementById("exportCsv").addEventListener("click", exportCsv);
document.getElementById("exportJson").addEventListener("click", exportJson);
document.getElementById("applyDefaults").addEventListener("click", () => {
  applyConsolidatedDefaults();
  render();
  alert("Dados consolidados aplicados aos campos vazios, sem sobrescrever respostas existentes.");
});
document.getElementById("printPdf").addEventListener("click", () => window.print());
document.getElementById("clearData").addEventListener("click", () => {
  if (confirm("Limpar respostas salvas neste navegador e voltar ao autopreenchimento consolidado?")) {
    state = {};
    localStorage.removeItem(STORAGE_KEY);
    applyConsolidatedDefaults();
    render();
  }
});
document.getElementById("importJson").addEventListener("change", (event) => {
  if (event.target.files[0]) importJson(event.target.files[0]);
});

applyConsolidatedDefaults();
render();
