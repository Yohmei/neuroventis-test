export const create_subject = () => {
  const observers = []
  let latest_value = undefined

  const add_observable = () => {
    const subscribe = (observer_action) => {
      const observer = {
        _id: observers.length,
        observer_action,
        unsubscribe: function () {
          const ths = this

          observers.splice(
            observers.findIndex((o) => {
              return o._id === ths._id
            }),
            1
          )

          if (observers.length === 0) latest_value = undefined
        },
      }

      observers.push(observer)

      if (latest_value) next(latest_value)

      return observer
    }

    const next = (value) => {
      for (const observer of observers) {
        observer.observer_action(value)
      }

      latest_value = value
    }

    return {
      subscribe,
      next,
    }
  }

  return { observers, add_observable }
}
