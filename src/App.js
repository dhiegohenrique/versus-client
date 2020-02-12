import LoadingModal from '@/components/loading-modal'
import Toast from '@/components/toast'
import Logo from '@/components/logo'

export default {
  name: 'app',
  components: {
    LoadingModal,
    Toast,
    Logo
  },
  watch: {
    $route: function (to, from) {
      // eslint-disable-next-line no-console
      console.log('to: ' + to.name + ', from: ' + from.name)
      // if (/login/.test(to.name)) {
      //   this.hideUtilities()
      // }

      // if (/login/.test(from.name)) {
      //   this.showUtilities()
      // }
    }
  }
}
