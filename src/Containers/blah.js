// const my_own_ids = this.state.owns.map(own => {
//     return own.game_id
// })
// const my_want_ids = this.state.wants.map(want => {
//     return want.game_id
// })

// const all_owns = [];
// const all_wants = [];
// const all_users = [];

const usersWhoOwnWhatIWant = all_owns.filter(own => my_want_ids.includes(own.game_id))
.map(own => own.user_id).filter((item, pos, self) => {return self.indexOf(item) === pos})

const usersWhoAlsoWantMyShit = usersWhoOwnWhatIWant.filter(user_id => {
    return all_wants.filter(want => {
        want.user_id === user_id
    }).any(want => my_own_ids.includes(want.game_id))
})

const stuff = usersWhoAlsoWantMyShit.map(user => {
    const canTradeMe = getOwnsOfUser(user).filter(own => my_want_ids.includes(own.game_id))
    const wantsFromMe = getWantsOfUser(user).filter(want => my_own_ids.includes(want.game_id))
    return {
        user: user,
        canTradeMe: canTradeMe,
        wantsFromMe: wantsFromMe
    }
})

const getOwnsOfUser = (user) => {
    all_owns.filter(own => {
        return own.user_id === user.id
    })
}

const getWantsOfUser = (user) => {
    all_wants.filter(want => {
        return want.user_id === user.id
    })
}

