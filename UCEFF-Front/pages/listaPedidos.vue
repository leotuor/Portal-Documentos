<template>
  <div class="faculdade-portal">
    <v-app-bar 
      color="#fa700c" 
      dark 
      elevation="4" 
      height="80"
      class="faculdade-header"
    >
      <v-container>
        <v-row align="center" no-gutters>
          <v-col cols="auto">
            <v-avatar size="60" class="mr-4" color="#FFFFFF">
              <v-icon size="40" color="#fa700c">mdi-school</v-icon>
            </v-avatar>
          </v-col>
          <v-col>
            <v-toolbar-title class="text-h5 font-weight-bold">
              Lista de Pedidos
            </v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              color="white"
              variant="text"
              @click="$router.push('/')"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Voltar
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container class="py-8">
        <v-row justify="center">
          <v-col cols="12">
            <v-card class="elevation-8 rounded-lg overflow-hidden">
              <v-card-title class="d-flex align-center white--text pa-6" style="background-color: #fa700c;">
                <v-icon size="40" class="mr-4" color="white">mdi-file-document-multiple</v-icon>
                <div>
                  <div class="text-h4 font-weight-bold">Lista de Pedidos</div>
                </div>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-autocomplete
                      v-model="filtroTipo"
                      :items="opcoesFiltragem"
                      item-title="label"
                      item-value="value"
                      label="Selecionar Tipo de Filtro"
                      variant="outlined"
                      clearable
                      prepend-inner-icon="mdi-tune"
                      color="#fa700c"
                      class="mb-4"
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="filtroTipo === 'tipo'">
                    <v-autocomplete
                      v-model="filtroDado"
                      :items="listaTiposDeclaracao"
                      item-title="tipo"
                      item-value="tipo"
                      label="Filtrar por Tipo de Documento"
                      variant="outlined"
                      clearable
                      prepend-inner-icon="mdi-filter"
                      color="#fa700c"
                      class="mb-4"
                    ></v-autocomplete>
                  </v-col>
                  <v-col v-if="filtroTipo === 'mes'">
                    <v-autocomplete
                      v-model="filtroDado"
                      :items="mesesAno"
                      item-title="label"
                      item-value="value"
                      label="Filtrar por Mês"
                      variant="outlined"
                      clearable
                      prepend-inner-icon="mdi-calendar-month"
                      color="#fa700c"
                      class="mb-4"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-data-table
                  :headers="headersDocumentos"
                  :items="pedidos"
                  :search="filtroDado"
                  :custom-filter="customFilter"
                  item-value="id"
                  class="elevation-1"
                  :items-per-page="10"
                >
                  <template v-slot:item.tipoDocumento="{ item }">
                    <v-chip
                      :color="obterCorDocumento(item.tipoDocumento)"
                      variant="flat"
                      class="font-weight-bold"
                    >
                      <v-icon left size="16">{{ obterIconeDocumento(item.tipoDocumento) }}</v-icon>
                      {{ item.tipoDocumento }}
                    </v-chip>
                  </template>

                  <template v-slot:item.actions="{ item }">
                    <div class="d-flex gap-2">
                      <v-btn
                        icon
                        size="small"
                        color="#fa700c"
                        variant="text"
                        @click="toggleDialogEditarPedido(item)"
                      >
                        <v-icon size="20">mdi-pencil</v-icon>
                        <v-tooltip activator="parent" location="top">
                          Editar
                        </v-tooltip>
                      </v-btn>
                      
                      <v-btn
                        icon
                        size="small"
                        color="red"
                        variant="text"
                        @click="excluirPedido(item)"
                      >
                        <v-icon size="20">mdi-delete</v-icon>
                        <v-tooltip activator="parent" location="top">
                          Excluir
                        </v-tooltip>
                      </v-btn>
                    </div>
                  </template>

                  <template v-slot:item.dataPedido="{ item }">
                    {{ formatarData(item.dataPedido) }}
                  </template>
                  
                  <template v-slot:no-data>
                    <div class="text-center pa-8">
                      <v-icon size="80" color="grey-lighten-2">mdi-file-document-outline</v-icon>
                      <p class="text-h6 mt-4 text-grey-darken-1">Nenhum pedido encontrado</p>
                    </div>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="editDialog" max-width="500px">
      <v-card>
        <v-card-title style="background-color: #fa700c; color: white;">
          Editar Pedido
        </v-card-title>
        
        <v-card-text class="pa-4">
          <v-autocomplete
            v-model="itemEditavel.aluno"
            :items="listaAlunos"
            item-title="nome"
            item-value="id"
            label="Aluno"
            variant="outlined"
          ></v-autocomplete>

          <v-autocomplete
            v-model="itemEditavel.tipo"
            :items="listaTiposDeclaracao"
            item-title="tipo"
            item-value="id"
            label="Tipo de Documento"
            variant="outlined"
          ></v-autocomplete>
        </v-card-text>
    
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="editDialog = false">Cancelar</v-btn>
          <v-btn color="#fa700c" @click="salvarEdicao">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

export default {
  name: 'ListaPedidos',
  data() {
    return {
      pedidos: [],
      editDialog: false,
      listaAlunos: [],
      listaTiposDeclaracao: [],
      filtroTipo: null,
      filtroDado: null,
      itemEditavel: { 
        id: null,
        aluno: '',
        tipo: '',
      },
      headersDocumentos: [
        { title: 'ID', key: 'id', sortable: true, width: '80px' },
        { title: 'Tipo de Documento', key: 'tipoDeclaracao.tipo', sortable: true },
        { title: 'Aluno', key: 'aluno.nome', sortable: true },
        { title: 'Matricula', key: 'aluno.matricula', sortable: true },
        { title: 'Data do Pedido', key: 'dataFormatada', sortable: true },
        { title: 'Ações', key: 'actions', sortable: false, width: '120px' }
      ],
      mesesAno: [
        { value: '01', label: 'Janeiro' },
        { value: '02', label: 'Fevereiro' },
        { value: '03', label: 'Março' },
        { value: '04', label: 'Abril' },
        { value: '05', label: 'Maio' },
        { value: '06', label: 'Junho' },
        { value: '07', label: 'Julho' },
        { value: '08', label: 'Agosto' },
        { value: '09', label: 'Setembro' },
        { value: '10', label: 'Outubro' },
        { value: '11', label: 'Novembro' },
        { value: '12', label: 'Dezembro' }
      ],
      opcoesFiltragem: [
        { value: 'tipo', label: 'Filtrar por Tipo de Documento' },
        { value: 'mes', label: 'Filtrar por Mês' }
      ],
    };
  },

  beforeMount() {
    this.getPedidos();
    this.getAlunos();
    this.getTiposDeclaracao();
  },

  methods: {
    async getPedidos() {
      const response = await fetch('http://localhost:3333/pedido-declaracao/detalhes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const text = await response.json();
      this.pedidos = text.data;
    },

    async getAlunos() {
      const response = await fetch('http://localhost:3333/aluno', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const text = await response.json();
      this.listaAlunos = text.data;
    },

    async getTiposDeclaracao() {
      const response = await fetch('http://localhost:3333/tipo-declaracao', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const text = await response.json();
      this.listaTiposDeclaracao = text.data;
    },

    obterCorDocumento(tipo) {
      const cores = {
        'Declaração de Matrícula': 'blue',
        'Declaração de Conclusão': 'green',
        'Declaração de Frequência': 'orange'
      };
      return cores[tipo] || 'grey';
    },

    obterIconeDocumento(tipo) {
      const icones = {
        'Declaração de Matrícula': 'mdi-school',
        'Declaração de Conclusão': 'mdi-certificate',
        'Declaração de Frequência': 'mdi-calendar-check'
      };
      return icones[tipo] || 'mdi-file-document';
    },

    formatarData(dataString) {
      if (!dataString) return '-';
      return new Date(dataString).toLocaleDateString('pt-BR');
    },

    excluirPedido(item) {
      if (confirm('Tem certeza que deseja excluir este pedido?')) {
        fetch(`http://localhost:3333/pedido-declaracao/destroy/${item.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(() => {
          this.getPedidos();
        });
      }
    },

    toggleDialogEditarPedido(item) {
      this.itemEditavel = {
        id: item.id,
        aluno: item.aluno.id,
        tipo: item.tipoDeclaracao.id,
      };
      this.editDialog = true;
    },

    customFilter(value, search, item) {
      if (this.filtroTipo === 'tipo' && item.columns['tipoDeclaracao.tipo'] !== this.filtroDado) {
        return false;
      }

      if (this.filtroTipo === 'mes' && this.filtroDado) {
        const data = item.columns['dataFormatada'];
        const mes = data.split('/')[1];
        if (mes !== this.filtroDado) {
          return false;
        }
      }

      return true;
    },

    async salvarEdicao() {
      if (!this.itemEditavel.aluno || !this.itemEditavel.tipo) {
        alert('Por favor, preencha todos os campos!');
        return;
      }
      const body = {
        idTipoDeclaracao: this.itemEditavel.tipo,
        idAluno: this.itemEditavel.aluno,
      };
      this.editDialog = false;
      const response = await fetch(`http://localhost:3333/pedido-declaracao/persist/${this.itemEditavel.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      this.getPedidos();
    }
  }
};
</script>

<style scoped>
.faculdade-portal {
  min-height: 100vh;
  background: linear-gradient(135deg, #fa700c 0%, #ffdb03 100%);
}

.faculdade-header {
  background: linear-gradient(135deg, #fa700c 0%, #e65a00 100%) !important;
}

.bg-grey-lighten-5 {
  background-color: #fafafa !important;
}

.v-card {
  border-radius: 12px !important;
  animation: fadeInUp 0.6s ease-out;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .faculdade-header .v-toolbar-title {
    font-size: 1.25rem !important;
  }
  
  .text-h4 {
    font-size: 1.75rem !important;
  }
  
  .text-h6 {
    font-size: 1.1rem !important;
  }
}
</style>