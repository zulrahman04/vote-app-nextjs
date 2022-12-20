interface Vote{
    id:String
    title:String
    startDateTime:String
    endDateTime:String
    publisher:String
    code:String
    candidates:Candidates[]
    createdAt:String
    deleteAt:String
    totalVotes:number
}