<script setup>
import {ref, watch} from 'vue'
import {captchaLogin, getQRCode, getQUID, pwdLogin, verify} from "@/api/user/login.js";
import {useUserStore} from "@/store/user/userStore.js";
import {musicAction} from "@/store/music/music.action.js";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {captchaTime} = storeToRefs(userStore)

const mode = ref('qrcode')
const email = ref('')
const phone = ref('')
const password = ref('')
const code = ref('')


const qrCode = ref('')
const qrInfo = ref('请打开网易云APP扫码登陆')

const wasCaptchaSend = ref(false)
const captchaLeft = ref(0)

let qrCodeTimer = null
let captchaTimer = null

async function getQR() {
  // 获取二维码
  // 1. 获取二维码
  // 2. 设置定时器，每隔一段时间，获取一次二维码状态
  // 3. 如果二维码状态为已扫描，清除定时器，跳转到登录成功页面
  // 4. 如果二维码状态为已失效，清除定时器，跳转到登录失败页面

  const [err, code] = await getQUID(+Date())
  if (err) {
    return
  } else {
    const [err, code] = await getQRCode(code, +Date())
    if (err) {
      return
    } else {
      qrCode.value = code
      qrCodeTimer = setInterval(async () => {
        const [err, code] = await getQRCode(code, +Date())
        if (err) {
          return
        } else {
          if (code === 800) {
            clearInterval(qrCodeTimer)
            qrInfo.value = '二维码已失效，请重新扫码'
          } else if (code === 801) {
            qrInfo.value = '请打开网易于音乐APP扫码登陆'
          } else if (code === 802) {
            qrInfo.value = '扫码成功，请在手机上确定登录'
          } else if (code === 803) {
            clearInterval(qrCodeTimer)
            qrInfo.value = '登录成功'
          }
        }
      }, 1000)
    }
  }
}


getQR()

const handleSubmit =async () => {
  if (mode.value === 'email') {

  }

  if (mode.value === 'phone') {
  const [err,res]=await pwdLogin(phone.value,password.value)
    if (err){

    }else {
      await userStore.setAccountLogin(res)
    }
  }

  if (mode.value === 'code') {
    if (code.value&&phone.value){
      const [err,res] = await verify(phone.value,code.value)
      if (err){

      }else {
        const [err,res]=await captchaLogin(phone.value,code.value)
        await userStore.setAccountLogin(res)
      }
    }

  }

}


async function getCaptcha(phone) {
  const sent = await userStore.sendCaptcha(phone)

  if (sent) {
    const sentTIme = captchaTime.value
    captchaTimer = setInterval(
        () => {
          const timeLeft = Math.floor(sentTIme - (+(new Date())))
          if (timeLeft){
            wasCaptchaSend.value = true
            captchaLeft.value = timeLeft
          }else {
            wasCaptchaSend.value = false
            captchaLeft.value = 0
          }
        }
    )
  }

}

watch(() => mode.value, (newVal, oldValue) => {

  if (oldValue === 'qrcode') {
    clearInterval('qrCodeTimer')
  }

  if (oldValue === 'code') {

  }

})


</script>

<template>

  <div class="login">
    <div class="login-container">
      <div class="title">
        <p>登录网易云账号</p>
      </div>

      <div class="section-1" v-show="mode==='qrcode'">
        <p>二维码</p>
        <el-image src="/"/>
      </div>


      <div class="section-2" v-show="mode==='email'">
        <el-input
            placeholder="邮箱"
        />
        <el-input
            placeholder="密码"
        />
      </div>

      <div class="section" v-show="mode==='code'">
        <el-input
            placeholder="手机号"
        />
        <el-input
            placeholder="验证码"
        />
      </div>

      <div class="section" v-show="mode==='phone'">
        <el-input
            placeholder="手机号"
        />
        <el-input
            placeholder="密码"
        />
      </div>

      <div class="confirm">
        <el-button>登录</el-button>
      </div>

      <div class="switch">
        <el-button v-show="mode!=='qrcode'" type="text" @click="mode='qrcode'">二维码登录</el-button>
        <el-button v-show="mode!=='email'" type="text" @click="mode='email'">邮箱登录</el-button>
        <el-button v-show="mode!=='code'" type="text" @click="mode='code'">验证码登录</el-button>
        <el-button v-show="mode!=='phone'" type="text" @click="mode='phone'">密码登录</el-button>

      </div>
    </div>
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

.section-1 {
  margin-bottom: 16px;
  display: flex;
  align-items: center;

  img {
    height: 64px;
    margin: 20px;
    user-select: none;
  }
}

.section-2 {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.input-box {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  color: var(--color-text);

  .container {
    display: flex;
    align-items: center;
    height: 46px;
    background: var(--color-secondary-bg);
    border-radius: 8px;
    width: 300px;
  }

  .svg-icon {
    height: 18px;
    width: 18px;
    color: #aaaaaa;
    margin: {
      left: 12px;
      right: 6px;
    }
  }

  .inputs {
    display: flex;
    width: 85%;
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

  input::placeholder {
    color: var(--color-text);
    opacity: 0.38;
  }

  input#countryCode {
    flex: 3;
  }

  input#phoneNumber {
    flex: 12;
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
  background-color: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: 8px;
  margin-top: 24px;
  transition: 0.2s;
  padding: 8px;
  width: 100%;
  width: 300px;

  &:hover {
    transform: scale(1.06);
  }

  &:active {
    transform: scale(0.94);
  }
}

.other-login {
  margin-top: 24px;
  font-size: 13px;
  color: var(--color-text);
  opacity: 0.68;

  a {
    padding: 0 8px;
  }
}

.notice {
  width: 300px;
  border-top: 1px solid rgba(128, 128, 128);
  margin-top: 48px;
  padding-top: 12px;
  font-size: 12px;
  color: var(--color-text);
  opacity: 0.48;
}

@keyframes loading {
  0% {
    opacity: 0.2;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0.2;
  }
}

button.loading {
  height: 44px;
  cursor: unset;

  &:hover {
    transform: none;
  }
}

.loading span {
  width: 6px;
  height: 6px;
  background-color: var(--color-primary);
  border-radius: 50%;
  margin: 0 2px;
  animation: loading 1.4s infinite both;
}

.loading span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading span:nth-child(3) {
  animation-delay: 0.4s;
}

.qr-code-container {
  background-color: var(--color-primary-bg);
  padding: 24px 24px 21px 24px;
  border-radius: 1.25rem;
  margin-bottom: 12px;
}

.qr-code-info {
  color: var(--color-text);
  text-align: center;
  margin-bottom: 28px;
}
</style>