<script setup>
import {nextTick, ref, watch} from 'vue'
import {captchaLogin, checkQRCode, emailLogin, getQRCode, getQUID, pwdLogin, verify} from "@/api/user/login.js";
import {useUserStore} from "@/store/user/userStore.js";
import {storeToRefs} from "pinia";
import {message} from "@/base/message.js";
import {getCaptchaCache, getProfileCache} from "utils/stroageController.js";
import {router} from "@/router/routers.js";
import BaseIcon from '@/base/BaseIcon.vue'

const userStore = useUserStore()
// const {captchaTime} = storeToRefs(userStore)

const mode = ref('qrcode')
const email = ref('')
const phone = ref('')
const password = ref('')

const formData = ref(
    {
      email: '',
      phone: '',
      password: '',
      captcha: ''
    }
)

const isValidated = ref(false)


const qrCode = ref('')
const qrInfo = ref('请打开网易云APP扫码登陆')

const captcha = ref({
  wasSend: false,
  timeLeft: 0
})

const regexValidator = (value, cb, filed, regex) => {
  if (value === '') {
    cb('请输入' + filed)
    isValidated.value = false
  } else {
    const res = regex.test(value)
    if (!res) {
      cb('请输入正确格式的' + filed)
      isValidated.value = false
    } else {
      isValidated.value = true
    }
  }
}

const validator = {
  email: [
    {
      validator: (rule, value, cb) => {
        regexValidator(value, cb, '邮箱', /^1[3456789]\d{9}$/)
      },
      trigger: 'blur'
    }
  ],
  phone: [
    {
      validator: (rule, value, cb) => {
        regexValidator(value, cb, '手机号', /^1[3456789]\d{9}$/)
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    {
      validator: (rule, value, cb) => {
        regexValidator(value, cb, '验证码', /\d{4}/)
      },
      trigger: 'blur'
    }
  ],
  password: [
    {
      validator: (rule, value, cb) => {
        regexValidator(value, cb, '密码', /\S{6,18}/)
      },
      trigger: 'blur'
    }
  ]
}

let qrCodeTimer = null
let captchaTimer = null

function checkLocalCache() {
  const profile = getProfileCache()
  if (profile) {
    message.warning('当前已经登录，将跳转到用户页面，如需重新登陆，请先退出')
    router.push({name: 'user', params: {uid: profile.account.id}})
  }
}

async function getQR() {
  // 获取二维码
  // 1. 获取二维码
  // 2. 设置定时器，每隔一段时间，获取一次二维码状态
  // 3. 如果二维码状态为已扫描，清除定时器，跳转到登录成功页面
  // 4. 如果二维码状态为已失效，清除定时器，跳转到登录失败页面

  const [err, key] = await getQUID(+new Date())
  if (err) {
    return false
  } else {
    const [err, code] = await getQRCode(key.data.unikey, +new Date())
    if (err) {
      return false
    } else {
      qrCode.value = code
      qrCodeTimer = setInterval(async () => {
        const [err, QRState] = await checkQRCode(key.data.unikey, +new Date())
        if (err) {
          return false
        } else {
          const {code, cookie} = QRState

          if (code === 800) {
            clearInterval(qrCodeTimer)
            qrInfo.value = '二维码已失效，请重新扫码'
          } else if (code === 801) {
            qrInfo.value = '请打开网易于音乐APP扫码登陆'
          } else if (code === 802) {
            qrInfo.value = '扫码成功，请在手机上确定登录'
          } else if (code === 803) {
            clearInterval(qrCodeTimer)
            await userStore.setAccountLogin(cookie)
            qrInfo.value = '登录成功'
          }
        }
      }, 1000)
    }
  }
}


const handleSubmit = async () => {
  const handleLoginError = () => {
    message.error('登录失败，请检查账号或密码')
  }

  const handleFiledError = () => {
    message.error('请输入账号或密码')
  }

  const {email, password, captcha, phone} = formData.value
  if (mode.value === 'email') {
    const [err, res] = await emailLogin(email, password)
    if (err || res.code !== 200) {
      handleLoginError()
    } else {
      await userStore.setAccountLogin(res.cookie)
    }
  }

  if (mode.value === 'phone') {
    const [err, res] = await pwdLogin(phone, password)
    if (err || res.code !== 200) {
      handleLoginError()
    } else {
      await userStore.setAccountLogin(res.cookie)
    }
  }

  if (mode.value === 'captcha') {
    if (captcha && phone) {
      const [err, res] = await verify(phone, captcha)
      if (err || res.code !== 200) {
        message.error('验证码错误')
      } else {
        const [err, res] = await captchaLogin(phone, captcha)
        await userStore.setAccountLogin(res)
      }
    }

  }

}


async function getCaptcha(phone) {
  const sent = await userStore.sendCaptcha(phone)

  if (sent) {
    const end = (+new Date()) + 60000
    captchaTimer = setInterval(
        () => {
          const now = +(new Date())
          const timeLeft = Math.floor((end - now) / 1000)
          if (timeLeft > 0) {
            captcha.value.wasSend = true
            captcha.value.timeLeft = timeLeft
          } else {
            captcha.value.wasSend = false
            captcha.value.timeLeft = 0
            clearInterval(captchaTimer)
          }
        }, 1000
    )
  }

}

//watch login mode change
watch(mode, (newVal, oldValue) => {
  if (oldValue === 'qrcode') {
    clearInterval('qrCodeTimer')
  }

  if (oldValue === 'captcha') {

  }

})


//init
checkLocalCache()
getQR()

</script>

<template>

  <div class="login">
    <el-form
        :rules="validator"
        :model="formData"
        label-width="70px"
        label-position="left"
        require-asterisk-position="left"
    >
      <div class="login-container">
        <div class="title">
          <p>登录网易云账号</p>
        </div>

        <div v-show="mode==='qrcode'">
          <div v-if="qrCode" class="img">
            <el-image :src="qrCode.data.qrimg"/>
          </div>
          <div v-else class="img img-fail">
            <BaseIcon type="play" :size="48"/>
            <p>二维码加载失败，请点击重试</p>
          </div>
        </div>


        <div class="account input-box">
          <el-form-item
              v-show="mode==='email'"
              prop="email"
              label="邮箱"
          >
            <div class="inputs">
              <el-input
                  size="large"
                  v-model="formData.email"
                  placeholder="邮箱"
                  class="inputs"
              />
            </div>

          </el-form-item>

          <el-form-item
              v-show="mode==='phone'||mode==='captcha'"
              prop="phone"
              label="手机号"
          >
            <div class="inputs">
              <el-input
                  size="large"
                  placeholder="手机号"
                  v-model="formData.phone"
              />
            </div>
          </el-form-item>
        </div>


        <div class="pwd input-box">
          <el-form-item
              v-show="mode==='email'||mode==='phone'"
              label="密码"
              prop="password"
          >
            <div class="inputs">
              <el-input
                  size="large"
                  v-model="formData.password"
                  placeholder="密码"
                  type="password"
                  show-password

              />
            </div>
          </el-form-item>

          <el-form-item
              v-show="mode==='captcha'"
              label="验证码"
              prop="captcha"
          >
            <div class="inputs">
              <el-input
                  size="large"
                  v-model="formData.captcha"
                  placeholder="验证码"
              >

                <template #append>
                  <BaseIcon
                      v-if="!captcha.wasSend"
                      @click="getCaptcha"
                      type="play"
                      :size="24"/>
                  <el-button disabled v-else>
                    {{ captcha.timeLeft }}秒后可再次发送
                  </el-button>
                </template>
              </el-input>
            </div>
          </el-form-item>
        </div>


        <div class="confirm">
          <el-button :disabled="!isValidated">登录</el-button>
        </div>

        <div class="switch">
          <el-button v-show="mode!=='qrcode'" text @click="mode='qrcode'">二维码登录</el-button>
          <el-button v-show="mode!=='email'" text @click="mode='email'">邮箱登录</el-button>
          <el-button v-show="mode!=='captcha'" text @click="mode='captcha'">验证码登录</el-button>
          <el-button v-show="mode!=='phone'" text @click="mode='phone'">密码登录</el-button>

        </div>
      </div>
    </el-form>
  </div>

</template>


<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32px;
}

.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 48px;
  color: var(--color-text);
}


.img {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  margin: 20px;
  user-select: none;
}

.img-fail {
  padding: 6px;
  background: rgba(65, 67, 80, 0.1);
}


.input-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  color: var(--color-text);


  .inputs {
    width: 300px;
  }

  input {
    font-size: 20px;
    border: none;
    background: transparent;
    width: 100%;
    font-weight: 600;
    margin-top: -1px;
    color: var(--color-text);
  }

  .active {
    background: var(--color-primary-bg);

    input,
    .svg-icon {
      color: var(--color-primary);
    }
  }
}

.confirm button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  background-color: var(--body-bgcolor);
  color: var(--font-color);
  border-radius: 8px;
  margin-top: 24px;
  transition: 0.2s;
  padding: 8px;
  width: 300px;
  height: 48px;

}

.switch {
  margin-top: 24px;
  font-size: 13px;
  opacity: 0.68;

  a {
    padding: 0 8px;
  }
}

</style>