<template>
  <div class="university-portal">
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
              Portal Acadêmico
            </v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-menu
              v-model="usuarioDropdown"
              location="bottom end"
              offset="10"
            >
              <template v-slot:activator="{ props }">
                <v-btn
                  icon
                  color="white"
                  v-bind="props"
                >
                  <v-icon size="55">mdi-account-circle</v-icon>
                </v-btn>
              </template>
              
              <v-card min-width="250" max-width="300" class="elevation-8">
                <v-card-title class="text-h6 font-weight-bold pa-4" style="background-color: #fa700c; color: white;">
                  <v-icon left class="mr-2" color="white">mdi-account</v-icon>
                  Usuário
                </v-card-title>
                <v-card-text class="pa-4">
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-title>
                        Aluno: {{ alunoLogado.nome || 'Não Logado' }}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="gerarAluno">
                      <v-list-item-title>
                        <v-icon left class="mr-2">mdi-account-edit</v-icon>
                        Gerar Perfil
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="listarUsuarios">
                      <v-list-item-title>
                        <v-icon left class="mr-2">mdi-logout</v-icon>
                        Alterar Usuário
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="$router.push('/listaPedidos')">
                      <v-list-item-title>
                          <v-icon left class="mr-2">mdi-format-list-bulleted</v-icon>
                        Lista de Pedidos
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-card-text>
              </v-card>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="bg-grey-lighten-5">
      <v-container class="py-8">
        <v-row>
          <v-col>
            <v-img src="/logo-uceff.png" alt="Logo Uceff" contain height="250"></v-img>
          </v-col>
        </v-row>
        <v-row justify="center" class="mb-8">
          <v-col cols="12" md="10" lg="8">
            <v-card class="elevation-8 rounded-lg overflow-hidden">
              <v-card-text class="pa-8 text-center">
                <v-icon 
                  size="80"
                  color="#fa700c" 
                  class="mb-4"
                >
                  mdi-file-document-multiple
                </v-icon>
                <h1 class="text-h4 font-weight-bold mb-4" style="color: #fa700c;">
                  Solicitação de Documentos Acadêmicos
                </h1>
                <p class="text-h6 text-grey-darken-1 mb-6">
                  Solicite seus documentos universitários de forma rápida e segura através do nosso portal digital.
                </p>
                <v-btn
                  color="#fa700c"
                  size="x-large"
                  elevation="4"
                  @click="openDialog"
                  class="px-8 py-3 text-h6"
                >
                  <v-icon left class="mr-2">mdi-file-plus</v-icon>
                  Solicitar Documento
                </v-btn>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="700" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="d-flex align-center white--text pa-6" style="background-color: #fa700c;">
          <v-btn
            v-if="telaRequisicao"
            icon
            variant="text"
            @click="voltar"
            class="mr-3"
            color="white"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <div class="text-h5 font-weight-bold">{{ dialogTitle }}</div>
          <v-spacer></v-spacer>
          <v-btn
            icon
            variant="text"
            @click="closeDialog"
            color="white"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-8">
          <div v-if="!telaRequisicao">
            <p class="text-h6 text-grey-darken-1 mb-6 text-center">
              Selecione o tipo de documento acadêmico que deseja solicitar:
            </p>
            <v-row>
              <v-col
                v-for="option in opcoesDocumentos"
                :key="option.value"
                cols="12"
              >
                <v-card
                  @click="selecionarDocumento(option)"
                  class="opcao-documento elevation-2 transition-swing"
                  hover
                >
                  <v-card-text class="pa-4">
                    <v-row align="center" no-gutters>
                      <v-col cols="auto">
                        <v-avatar size="60" :color="option.color" class="white--text mr-4">
                          <v-icon size="30">{{ option.icon }}</v-icon>
                        </v-avatar>
                      </v-col>
                      <v-col>
                        <h3 class="text-h6 font-weight-bold mb-1">{{ option.title }}</h3>
                        <p class="text-body-2 text-grey-darken-1 mb-0">{{ option.description }}</p>
                      </v-col>
                      <v-col cols="auto">
                        <v-icon color="#fa700c">mdi-chevron-right</v-icon>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>

          <div v-else>
            <div class="text-center mb-6">
              <v-avatar size="80" :color="documentoSelecionado.color" class="white--text mb-4">
                <v-icon size="40">{{ documentoSelecionado.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h5 font-weight-bold text-primary">{{ documentoSelecionado.title }}</h3>
              <p class="text-body-1 text-grey-darken-1">Preencha os dados necessários para sua solicitação</p>
            </div>
          </div>
        </v-card-text>

        <v-card-actions v-if="telaRequisicao" class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn
            color="#fa700c"
            @click="enviarSolicitacao"
            size="large"
            elevation="2"
          >
            <v-icon left>mdi-send</v-icon>
            Enviar Solicitação
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="usuariosLista" max-width="800" persistent>
      <v-card class="rounded-lg">
        <v-card-title class="d-flex align-center white--text pa-6" style="background-color: #fa700c;">
          <div class="text-h5 font-weight-bold">Lista de Usuários</div>
          <v-spacer></v-spacer>
          <v-btn
            icon
            variant="text"
            @click="usuariosLista = false"
            color="white"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-6">
          <v-data-table
            :headers="usuariosHeaders"
            :items="usuarios"
            :loading="loadingUsuarios"
            item-value="id"
            class="elevation-1"
          >
            <template v-slot:item.actions="{ item }">
              <v-btn
                color="#fa700c"
                variant="text"
                size="small"
                @click="selecionarUsuario(item)"
              >
                <v-icon left>mdi-account-switch</v-icon>
                Selecionar
              </v-btn>
            </template>
            
            <template v-slot:no-data>
              <div class="text-center pa-4">
                <v-icon size="48" color="grey">mdi-account-off</v-icon>
                <p class="text-h6 mt-2">Nenhum usuário encontrado</p>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="success"
      timeout="4000"
      location="top"
    >
      <v-icon left class="mr-2">mdi-check-circle</v-icon>
      Solicitação enviada com sucesso!
      <template v-slot:actions>
        <v-btn
          variant="text"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      telaRequisicao: false,
      snackbar: false,
      usuarioDropdown: false,
      usuariosLista: false,
      usuarios: [],
      alunoLogado: {
        id: null,
        nome: null,
        dataNascimento: null,
        matricula: null,
      },
      usuariosHeaders: [
        { title: 'ID', key: 'id', sortable: true },
        { title: 'Nome', key: 'nome', sortable: true },
        { title: 'Matrícula', key: 'matricula', sortable: true },
        { title: 'Data de Nascimento', key: 'dataNascimento', sortable: true },
        { title: 'Ações', key: 'actions', sortable: false, align: 'center' }
      ],
      documentoSelecionado: null,
      opcoesDocumentos: [
        {
          value: 'matricula',
          title: 'Declaração de Matrícula',
          description: 'Documento que comprova sua matrícula ativa na instituição de ensino',
          icon: 'mdi-school',
          color: 'blue'
        },
        {
          value: 'conclusao',
          title: 'Declaração de Conclusão',
          description: 'Documento que atesta a conclusão do seu curso de graduação ou pós-graduação',
          icon: 'mdi-certificate',
          color: 'green'
        },
        {
          value: 'frequencia',
          title: 'Declaração de Frequência',
          description: 'Documento que comprova sua frequência regular nas disciplinas cursadas',
          icon: 'mdi-calendar-check',
          color: 'orange'
        }
      ],
      rules: {
        required: value => !!value || 'Campo obrigatório'
      }
    };
  },
  
  computed: {
    dialogTitle() {
      if (!this.telaRequisicao) {
        return 'Solicitar Documento';
      }
    },
  },

  methods: {
    openDialog() {
      this.dialog = true;
      this.telaRequisicao = false;
    },
    
    closeDialog() {
      this.dialog = false;
      this.telaRequisicao = false;
      this.documentoSelecionado = null;
    },
    
    selecionarDocumento(option) {
      this.documentoSelecionado = option;
      this.telaRequisicao = true;
    },
    
    voltar() {
      this.telaRequisicao = false;
    },

    async enviarSolicitacao() {
      try {
        if (!this.alunoLogado.nome || !this.alunoLogado.dataNascimento || !this.alunoLogado.matricula) {
          alert('É Necessario estar logado para requisitar um documento.');
          return;
        }
        const documentTypeMap = {
          'matricula': 1,
          'conclusao': 2,
          'frequencia': 3
        };

        const response = await fetch('http://localhost:3333/pedido-declaracao/persist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idTipoDeclaracao: documentTypeMap[this.documentoSelecionado.value],
            idAluno: this.alunoLogado.id
          })
        });
        const preDestruct = await response.json();
        const data = preDestruct.data;
        console.log(data);
        this.snackbar = true;
        this.telaRequisicao = false;
      } catch (error) {
        console.error(error);
        alert('Erro ao enviar solicitação. Tente novamente mais tarde.');
      }
    },

    async gerarAluno(){
      try {
        const response = await fetch('http://localhost:3333/aluno/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const preDestruct = await response.json();
        const data = preDestruct.data;
        this.alunoLogado = {
          id: this.alunoLogado.id,
          nome: data.nome,
          dataNascimento: data.dataNascimento,
          matricula: data.matricula
        };
      } catch (error) {
        console.error('Erro ao gerar aluno:', error);
      }
    },

    async listarUsuarios() {
      this.usuarioDropdown = false;
      this.usuariosLista = true;
      this.loadingUsuarios = true;
      
      try {
        const response = await fetch('http://localhost:3333/aluno', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (response.ok) {
          const result = await response.json();
          this.usuarios = result.data || [];
        } else {
          console.error('Erro ao carregar usuários');
          this.usuarios = [];
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
        this.usuarios = [];
      } finally {
        this.loadingUsuarios = false;
      }
    },

    selecionarUsuario(usuario) {
      this.alunoLogado = {
        id: usuario.id,
        nome: usuario.nome,
        dataNascimento: usuario.dataNascimento,
        matricula: usuario.matricula
      };
      this.usuariosLista = false;
      console.log('Usuário selecionado:', usuario);
    },
  }
};
</script>

<style scoped>
.university-portal {
  min-height: 100vh;
  background: linear-gradient(135deg, #fa700c 0%, #ffdb03 100%);
}

.faculdade-header {
  background: linear-gradient(135deg, #fa700c 0%, #e65a00 100%) !important;
}

.opcao-documento {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  margin-bottom: 16px;
}

.opcao-documento:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: #fa700c;
}

.bg-grey-lighten-5 {
  background-color: #fafafa !important;
}

.transition-swing {
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.v-card {
  border-radius: 12px !important;
  animation: fadeInUp 0.6s ease-out;
}

.v-btn {
  text-transform: none !important;
  letter-spacing: 0.5px;
}

.text-primary {
  color: #fa700c !important;
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