import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:3000/api'
})

const actions = {
  userLogin: ({ commit }, userData) => {
    return new Promise((resolve, reject) => {
      http.post('/users', userData)
        .then(({ data }) => {
          commit('setUserProfile', data.user)
          resolve(data.accesstoken)
        })
        .catch(err => reject(err))
    })
  },
  userProfile: ({ commit }) => {
    http.get('/users/profile', {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => commit('setUserProfile', data.user))
      .catch(err => console.log(err))
  },
  // ----------------------------------------------------------------------------------------------------
  getAllQuestions: ({ commit }) => {
    http.get('/questions')
      .then(({ data }) => commit('setQuestions', data.questions))
      .catch(err => console.log(err))
  },
  getQuestionById: ({ commit }, id) => {
    http.get('/questions/' + id)
      .then(({ data }) => commit('setQuestion', data.question))
      .catch(err => console.log(err))
  },
  addNewQuestion: ({ commit }, question) => {
    http.post('/questions', question, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        http.get('/questions/' + data.newQuestion._id)
          .then(({ data }) => commit('setNewQuestion', data.question))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  },
  deleteQuestion: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      http.delete('/questions/' + id, {
        headers: { accesstoken: localStorage.getItem('accesstoken') }
      })
        .then(({ data }) => resolve(data.deletedQuestion))
        .catch(err => console.log(err))
    })
  },
  upVoteQuestion: ({ commit }, id) => {
    http.put('/questions/' + id + '/upvote', {}, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        // console.log(data.updatedQuestion.upVoters)
        // optimistic
      })
      .catch(err => console.log(err))
  },
  downVoteQuestion: ({ commit }, id) => {
    http.put('/questions/' + id + '/downvote', {}, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        // console.log(data.updatedQuestion.downVoters)
        // optimistic
      })
      .catch(err => console.log(err))
  },
  // ----------------------------------------------------------------------------------------------------
  getAnswersByQuestionId: ({ commit }, id) => {
    http.get('/answers/questions/' + id)
      .then(({ data }) => commit('setAnswers', data.answers))
      .catch(err => console.log(err))
  },
  addNewAnswer: ({ commit }, answer) => {
    http.post('/answers', answer, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        http.get('/answers/' + data.newAnswer._id)
          .then(({ data }) => commit('setNewAnswer', data.answer))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  },
  deleteAnswer: ({ commit }, id) => {
    http.delete('/answers/' + id, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        // console.log(data.result)
        // optimistic
      })
      .catch(err => console.log(err))
  },
  upVoteAnswer: ({ commit }, id) => {
    http.put('/answers/' + id + '/upvote', {}, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        // console.log(data.updatedAnswer.upVoters)
        // optimistic
      })
      .catch(err => console.log(err))
  },
  downVoteAnswer: ({ commit }, id) => {
    http.put('/answers/' + id + '/downvote', {}, {
      headers: { accesstoken: localStorage.getItem('accesstoken') }
    })
      .then(({ data }) => {
        // console.log(data.updatedAnswer.downVoters)
        // optimistic
      })
      .catch(err => console.log(err))
  }
}

export default actions
