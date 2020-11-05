class Api::V1::TweetsController < ApplicationController
    def create
        @tweet = User.first.tweets.create(tweet_params)
        render json: @tweet
    end

    private

    def tweet_params
        params.require(:tweet).permit(:content)
    end
end
