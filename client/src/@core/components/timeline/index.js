// ** Third Party Components
import Proptypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import classnames from 'classnames'
import { Media } from 'reactstrap'
import Avatar from '@components/avatar'
import { getTimeSince, getUserAvatar } from '@utils'
import defaultAvatar from '@src/assets/images/default/avatar_default.jpeg'
import defaultVehicle from '@src/assets/images/default/car_model_default.png'

const Timeline = props => {
  // ** Props
  const { data, tag, className } = props

  // ** Custom Tagg
  const Tag = tag ? tag : 'ul'
  return (
    <Tag
      className={classnames('timeline', {
        [className]: className
      })}
    >
      {data.map((item, i) => {
        const ItemTag = item.tag ? item.tag : 'li'
        return (
          <ItemTag
            key={i}
            className={classnames('timeline-item', {
              [item.className]: className
            })}
          >
            <span
              className={classnames('timeline-point', {
                [`timeline-point-${item.color}`]: item.color,
                'timeline-point-indicator': !item.icon
              })}
            >
              {item.icon ? item.icon : null}
            </span>
            <div className='timeline-event'>
              <div
                className={classnames('d-flex justify-content-between flex-sm-row flex-column', {
                  'mb-sm-0 mb-1': item.meta
                })}
              >
                <h6>{item.title}</h6>
                {item.date ? (
                  <span
                    className={classnames('timeline-event-time', {
                      [item.metaClassName]: item.metaClassName
                    })}
                  >
                    {getTimeSince(item.date)} ago
                  </span>
                ) : null}
              </div>
              {/* <p
                className={classnames({
                  'mb-0': i === data.length - 1 && !item.customContent
                })}
              >
                {item.content}
              </p> */}
              {item.meta && (
                <Media className='align-items-center'>
                  <Avatar img={item.meta.img === null ? (item.meta.type === 'vehicle' ? defaultVehicle : defaultAvatar) : item.meta.img} />
                  <Media className='ml-50 d-flex flex-column align-flex-start' body>
                    <NavLink className="text-secondary" to={item.meta.link}>{item.meta.name}</NavLink>
                    <span style={{fontSize: '12px', fontWeight: 'bolder'}}>{item.meta.desc}</span>
                  </Media>
                </Media>
              )}
            </div>
          </ItemTag>
        )
      })}
    </Tag>
  )
}

export default Timeline

// ** PropTypes
Timeline.propTypes = {
  data: Proptypes.array.isRequired,
  className: Proptypes.string,
  tag: Proptypes.string
}
