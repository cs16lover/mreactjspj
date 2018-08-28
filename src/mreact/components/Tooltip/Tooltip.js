// import RcTooltip from 'rc-tooltip';
import RcTooltip from '../../helper/RCTooltip';

export default class Tooltip extends RcTooltip {
    static displayName = 'm-tooltip'
    static propTypes = {
        ...RcTooltip.propTypes,
    }
    static defaultProps = {
        ...RcTooltip.defaultProps,
        prefixCls: 'm-tooltip',
        transitionName: 'tip-slide',
    }
}
