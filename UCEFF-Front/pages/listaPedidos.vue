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
              Portal Acadêmico - Lista de Pedidos
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
                  <div class="text-subtitle-1">Acompanhe suas solicitações de documentos</div>
                </div>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-data-table
                  :headers="headersDocumentos"
                  :items="pedidos"
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
  </div>
</template>

<script>
export default {
  name: 'ListaPedidos',
  data() {
    return {
      pedidos: [],
      headersDocumentos: [
        { title: 'ID', key: 'id', sortable: true, width: '80px' },
        { title: 'Tipo de Documento', key: 'tipoDocumento', sortable: true },
        { title: 'Aluno', key: 'aluno.nome', sortable: true },
        { title: 'Matricula', key: 'aluno.matricula', sortable: true },
        { title: 'Data do Pedido', key: 'dataPedido', sortable: true }
      ]
    };
  },

  created() {
    this.getPedidos();
  },

  methods: {
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

    async getPedidos() {
      const response = await fetch('http://localhost:3333/pedido-declaracao/detalhes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        this.pedidos = data;
      } else {
        console.error('Erro ao buscar pedidos:', response.statusText);
      }
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