
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
const logoImg = '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'

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 200,
        data: {
          userId: 456,
          trueName: 'admin',
          username: 'admin',
          functionCodes: [1]
        }
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: () => {
      return {
        code: 200,
        data: 'success'
      }
    }
  },

  {
    url: '/user/imgCode',
    type: 'get',
    response: () => {
      return {
        code: 200,
        data: logoImg
      }
    }
  }
]
