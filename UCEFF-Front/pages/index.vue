<template>
  <div class="university-portal">
    <v-app-bar 
      color="#fa700c" 
      dark 
      elevation="4" 
      height="80"
      class="university-header"
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
            v-if="showForm"
            icon
            variant="text"
            @click="goBack"
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
          <div v-if="!showForm">
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
                  @click="selectDocument(option)"
                  class="document-option elevation-2 transition-swing"
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
              <v-avatar size="80" :color="selectedDocument.color" class="white--text mb-4">
                <v-icon size="40">{{ selectedDocument.icon }}</v-icon>
              </v-avatar>
              <h3 class="text-h5 font-weight-bold text-primary">{{ selectedDocument.title }}</h3>
              <p class="text-body-1 text-grey-darken-1">Preencha os dados necessários para sua solicitação</p>
            </div>
            
            <v-form ref="form" v-model="formValid">
              <v-text-field
                v-model="form.field1"
                :label="formFields.field1"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
                prepend-inner-icon="mdi-account"
              ></v-text-field>

              <v-text-field
                v-model="form.field2"
                :label="formFields.field2"
                :rules="[rules.required]"
                variant="outlined"
                class="mb-4"
                prepend-inner-icon="mdi-calendar"
              ></v-text-field>

              <v-textarea
                v-model="form.field3"
                :label="formFields.field3"
                :rules="[rules.required]"
                variant="outlined"
                rows="3"
                class="mb-4"
                prepend-inner-icon="mdi-text"
              ></v-textarea>
            </v-form>
          </div>
        </v-card-text>

        <v-card-actions v-if="showForm" class="pa-6 pt-0">
          <v-btn
            color="grey-darken-1"
            variant="text"
            size="large"
            @click="goBack"
            class="mr-4"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            Voltar
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="#fa700c"
            :disabled="!formValid"
            @click="submitForm"
            size="large"
            elevation="2"
          >
            <v-icon left>mdi-send</v-icon>
            Enviar Solicitação
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      color="success"
      timeout="4000"
      location="top"
    >
      <v-icon left class="mr-2">mdi-check-circle</v-icon>
      Solicitação enviada com sucesso! Você receberá um e-mail de confirmação.
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
      showForm: false,
      formValid: false,
      snackbar: false,
      selectedDocument: null,
      form: {
        field1: '',
        field2: '',
        field3: ''
      },
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
      if (!this.showForm) {
        return 'Solicitar Documento';
      }
      return this.selectedDocument ? this.selectedDocument.title : 'Formulário';
    },
    
    formFields() {
      if (!this.selectedDocument) return {};
      
      const fields = {
        matricula: {
          field1: 'Número de Matrícula',
          field2: 'Curso/Programa',
          field3: 'Finalidade do Documento'
        },
        conclusao: {
          field1: 'Nome Completo',
          field2: 'Curso Concluído',
          field3: 'Finalidade/Observações'
        },
        frequencia: {
          field1: 'Período de Referência',
          field2: 'Disciplinas/Semestre',
          field3: 'Justificativa da Solicitação'
        }
      };
      
      return fields[this.selectedDocument.value] || {};
    }
  },

  methods: {
    openDialog() {
      this.dialog = true;
      this.showForm = false;
      this.resetForm();
    },
    
    closeDialog() {
      this.dialog = false;
      this.showForm = false;
      this.selectedDocument = null;
      this.resetForm();
    },
    
    selectDocument(option) {
      this.selectedDocument = option;
      this.showForm = true;
    },
    
    goBack() {
      this.showForm = false;
      this.resetForm();
    },
    
    resetForm() {
      this.form = {
        field1: '',
        field2: '',
        field3: ''
      };
      this.formValid = false;
      if (this.$refs.form) {
        this.$refs.form.resetValidation();
      }
    },
    
    submitForm() {
      if (this.formValid) {
        console.log('Form submitted:', {
          documentType: this.selectedDocument.value,
          data: this.form
        });
        
        this.snackbar = true;
        this.closeDialog();
      }
    }
  }
};
</script>

<style scoped>
.university-portal {
  min-height: 100vh;
  background: linear-gradient(135deg, #fa700c 0%, #ffdb03 100%);
}

.university-header {
  background: linear-gradient(135deg, #fa700c 0%, #e65a00 100%) !important;
}

.document-option {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 2px solid transparent;
  margin-bottom: 16px;
}

.document-option:hover {
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

.v-card {
  animation: fadeInUp 0.6s ease-out;
}

@media (max-width: 768px) {
  .university-header .v-toolbar-title {
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