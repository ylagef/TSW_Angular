<?= $this->Html->css('pollIndex') ?>

<!-- CENTRAL JUMBOTRON -->
<div class="jumbotron jumbotron-fluid rounded">
    <div class="container">
      <h1 class="display-4"><?=__("My Polls")?></h1>

      <div class="row">

        <div class="col-lg-6">
          <div class="table-responsive">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col"><?=__("Polls created by me")?></th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($createdPolls as $poll): ?>
              <?php  if( $this->request->getSession()->read('Auth.User.user_id')==$poll->author){ ?>
                <tr>
                <th scope="row" class="font-weight-normal"><p><?= h($poll->title) ?></p><p class="font-weight-light"><?= h($poll->place) ?></p></th>
                  <td>
                    <?= $this->Html->link(__('View'), ['action' => 'view', $poll->url],['class'=>'btn btn-outline-info  btn-sm text-uppercase']) ?>
                  </td>
                </tr>
                <?php } ?>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="table-responsive">
            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col"><?=__("Polls in which I participate")?></th>
                </tr>
              </thead>
              <tbody>
              <?php foreach ($participatingPolls as $poll): ?>
                <tr>
                  <th scope="row" class="font-weight-normal"><p><?= h($poll->title) ?></p><p class="font-weight-light"><?= h($poll->place) ?></p></th>
                  <td>
                  <?= $this->Html->link(__('View'), ['action' => 'view', $poll->url],['class'=>'btn btn-outline-info  btn-sm text-uppercase']) ?>
                  </td>
                </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>