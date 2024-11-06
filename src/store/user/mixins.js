
import { DEFAULT_UNAUTHENTICATED_PAGE } from '@/config/routing'
import { USER_ACTION_TYPES } from './action-types'
import { getAuthenticationCookie } from '@/assets/scripts/utils/authentication'

const userMixins = {}

userMixins.unauthenticated = {
  computed: {
    user: function () {
      return this.$store.state.user
    }
  },
  methods: {
    userRegister: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.REGISTER, payload)
    },
    userLogin: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.LOGIN, payload)
    },
    userForgotPassword: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.FORGOT_PASSWORD, payload)
    },
    userResetPassword: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.RESET_PASSWORD, payload)
    }
  }
}

userMixins.authenticatedData = {
  computed: {
    user: function () {
      return this.$store.state.user
    },
    userHasData: function () {
      return this.$store.getters.userHasData
    },
    userIsAuthenticated: function () {
      return !!getAuthenticationCookie()
    }
  },
  mounted: function () {
    this.$store.dispatch(USER_ACTION_TYPES.GET)
  }
}

userMixins.authenticatedUpdate = {
  /* TODO
  Delete
   */
  methods: {
    userUpdate: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.UPDATE, payload)
    },
    userPasswordChange: function (payload) {
      this.$store.dispatch(USER_ACTION_TYPES.CHANGE_PASSWORD, payload)
    },
    userLogout: function () {
      const payload = {
        onSuccess: () => {
          this.$router.push(DEFAULT_UNAUTHENTICATED_PAGE.path)
        }
      }

      this.$store.dispatch(USER_ACTION_TYPES.LOGOUT, payload)
    }
  }
}

export { userMixins }
