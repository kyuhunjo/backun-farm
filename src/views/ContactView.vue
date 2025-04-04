<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <h1 class="text-h3 mb-6">문의하기</h1>

        <v-card>
          <v-card-text>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.name"
                    label="이름"
                    required
                    variant="outlined"
                    :rules="[v => !!v || '이름을 입력해주세요']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" md="6">
                  <v-text-field
                    v-model="formData.phone"
                    label="연락처"
                    required
                    variant="outlined"
                    :rules="[v => !!v || '연락처를 입력해주세요']"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="formData.email"
                    label="이메일"
                    required
                    variant="outlined"
                    :rules="[
                      v => !!v || '이메일을 입력해주세요',
                      v => /.+@.+\..+/.test(v) || '올바른 이메일 형식이 아닙니다'
                    ]"
                  ></v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="formData.category"
                    :items="categories"
                    label="문의 유형"
                    required
                    variant="outlined"
                    :rules="[v => !!v || '문의 유형을 선택해주세요']"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="formData.message"
                    label="문의 내용"
                    required
                    variant="outlined"
                    :rules="[v => !!v || '문의 내용을 입력해주세요']"
                    rows="5"
                  ></v-textarea>
                </v-col>

                <v-col cols="12">
                  <v-checkbox
                    v-model="formData.agreement"
                    label="개인정보 수집 및 이용에 동의합니다"
                    required
                    :rules="[v => !!v || '개인정보 수집 및 이용에 동의해주세요']"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              size="large"
              @click="submitForm"
              :loading="loading"
            >
              문의하기
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- 문의 완료 다이얼로그 -->
        <v-dialog v-model="dialog" max-width="400">
          <v-card>
            <v-card-title class="text-h5">
              문의가 접수되었습니다
            </v-card-title>
            <v-card-text>
              빠른 시일 내에 답변 드리도록 하겠습니다.
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                variant="text"
                @click="dialog = false"
              >
                확인
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const form = ref(null)
const loading = ref(false)
const dialog = ref(false)

const categories = [
  '귀농 정책 문의',
  '교육 프로그램 문의',
  '지역 정보 문의',
  '기술 지원 문의',
  '기타 문의'
]

const formData = ref({
  name: '',
  phone: '',
  email: '',
  category: '',
  message: '',
  agreement: false
})

const submitForm = async () => {
  const { valid } = await form.value.validate()
  
  if (valid) {
    loading.value = true
    // 여기에 실제 폼 제출 로직 추가
    await new Promise(resolve => setTimeout(resolve, 1000))
    loading.value = false
    dialog.value = true
    form.value.reset()
  }
}
</script> 