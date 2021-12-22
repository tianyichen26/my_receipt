export const SUBMIT_VALUE = 'SUBMIT_VALUE';

//  'action creator'

export function submitLike(input) {
    return {
        type: SUBMIT_VALUE,
        payload: {
            submittedLike: input
        }
    }
}