  const React = require('react');

  const FightList = React.createClass({
    componentDidMount: function () {
      var items = this.getFightsNow();
      console.log('items', items);
    },
    getFightsNow: function () {
      return (
          this.props.fights.reverse().map((item) => {
           console.log('item', item.date);
            <div className="row" key={item.id}>
             <div className="column small-centered medium-6 large-6">
             <div className="card align-center" style={{width:500}}>
               <div className="card-divider">
                 <h4 className="text-center">{item.title_tag}</h4>
                 <p className="text-center">{item.title}</p>
               </div>
               <button><img className="align-center" src={item.img}/></button>
               <div className="card-section">
                 <p>{moment.utc(item.date).format('dddd, MMMM Do YYYY')}</p>
               </div>
             </div>
           </div>
         </div>
       })
      )
    },
    render: function () {
      var {fights} = this.props;

      console.log('fightlist', fights);
      return (
        <div>
          <p>{fights}</p>
        </div>
      )
    }
  });

  module.exports = FightList;
