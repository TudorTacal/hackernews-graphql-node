function newLinkSubscribe(parent, args, context, info) {
  return context.db.subscription.link(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

function newVoteSubscribe(parent, args, context, info) {
  return context.db.subscription.vote(
    { where: { mutation_in: ['CREATED'] } },
    info,
  )
}

const newVote = {
  subscribe: newVoteSubscribe,
}
const newLink = {
  subscribe: newLinkSubscribe,
}

module.exports = { 
  newLink,
  newVote,
}